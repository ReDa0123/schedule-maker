import {
  difference,
  map,
  o,
  prop,
  replace,
  toLower,
  toUpper,
  trim,
  without,
} from 'ramda';
import { resetBlocksOfTournament } from '../block/helper';

const trimAndLowerCase = map(o(trim, toLower));
const getNames = map(o(toLower, prop('name')));
const capitalizeFirstLetter = replace(/^./, toUpper);

export const getGroups = async (
  inputArray,
  tableName,
  tournamentId,
  dbConnection
) => {
  const lowerCaseInputs = trimAndLowerCase(inputArray);
  const allExistingGroups = await dbConnection.query(
    `SELECT * FROM ${tableName};`
  );
  const allGroupsOfTournament = await dbConnection.query(
    `SELECT * FROM ${tableName} JOIN tournament_${tableName} USING (${tableName}Id) WHERE tournamentId = ?`,
    [tournamentId]
  );
  const existingGroupNames = getNames(allExistingGroups);

  const newGroups = difference(lowerCaseInputs, existingGroupNames);
  const alreadyCreatedGroups = without(newGroups, lowerCaseInputs);

  const removedGroups = allGroupsOfTournament.filter(
    (group) => !lowerCaseInputs.includes(group.name.toLowerCase())
  );

  return [
    removedGroups,
    newGroups,
    alreadyCreatedGroups,
    allGroupsOfTournament,
    allExistingGroups,
  ];
};

export const removeGroups = async (
  removedGroups,
  tableName,
  tournamentId,
  dbConnection,
  checkBlocks
) =>
  Promise.all(
    removedGroups.map(async (group) => {
      const { name } = group;
      const idName = `${tableName}Id`;
      const id = group[idName];

      if (checkBlocks) {
        const assignedGroups = await dbConnection.query(
          `SELECT blockId FROM block WHERE tournamentId = ? AND ${idName} = ?`,
          [tournamentId, id]
        );

        if (assignedGroups.length > 0) {
          throw new Error(
            `${capitalizeFirstLetter(
              tableName
            )} ${name} is assigned to a block. Please remove the ${tableName} from the block before removing it from the tournament.`
          );
        }
      } else {
        await resetBlocksOfTournament(idName, id, dbConnection, tournamentId);
      }
      return await dbConnection.query(
        `DELETE FROM tournament_${tableName} WHERE tournamentId = ? AND ${idName} = ?`,
        [tournamentId, id]
      );
    })
  );

export const saveGroups = async (
  newGroups,
  tableName,
  alreadyCreatedGroups,
  existingGroupsOfTournament,
  existingGroups,
  tournamentId,
  dbConnection
) => {
  const idName = `${tableName}Id`;
  return Promise.all(
    //insert new groups
    newGroups
      .map(async (group) => {
        const dbResponse = await dbConnection.query(
          `INSERT INTO ${tableName} (name) VALUES (?)`,
          [group]
        );
        return await dbConnection.query(
          `INSERT INTO tournament_${tableName} (tournamentId, ${idName}) VALUES (?, ?)`,
          [tournamentId, dbResponse.insertId]
        );
      })
      //insert already created groups
      .concat(
        alreadyCreatedGroups.map(async (group) => {
          // Check if the group is already assigned to the tournament
          if (
            existingGroupsOfTournament.some(
              ({ name }) => name.toLowerCase() === group
            )
          ) {
            return;
          }
          const groupId = existingGroups.find(
            ({ name }) => name.toLowerCase() === group
          )[idName];
          return await dbConnection.query(
            `INSERT INTO tournament_${tableName} (tournamentId, ${idName}) VALUES (?, ?)`,
            [tournamentId, groupId]
          );
        })
      )
  );
};
