import { validateArea } from './validations';
import { map, o, prop, toLower, trim } from 'ramda';
import { resetBlocks } from '../block/helper';

export const saveAreas = async (
  _,
  { areas, tournamentId },
  { dbConnection, auth }
) => {
  await validateArea({
    auth,
    dbConnection,
    tournamentId,
    areas,
  });
  const areasInLowerCase = map(o(trim, toLower), areas);
  const existingAreas = await dbConnection.query(`SELECT * FROM area;`);
  const existingAreasOfTournament = await dbConnection.query(
    `SELECT * FROM area JOIN tournament_area USING (areaId) WHERE tournamentId = ?`,
    [tournamentId]
  );
  const existingAreasNames = map(o(toLower, prop('name')))(existingAreas);
  const { newAreas, alreadyCreatedAreas } = areasInLowerCase.reduce(
    (acc, area) => {
      if (existingAreasNames.includes(area)) {
        acc.alreadyCreatedAreas.push(area);
      } else {
        acc.newAreas.push(area);
      }
      return acc;
    },
    { newAreas: [], alreadyCreatedAreas: [] }
  );
  const removedAreas = existingAreasOfTournament.filter(
    (area) => !areasInLowerCase.includes(area.name.toLowerCase())
  );

  try {
    await Promise.all(
      removedAreas.map(async ({ areaId }) => {
        await resetBlocks('areaId', areaId, dbConnection);
        return await dbConnection.query(
          `DELETE FROM tournament_area WHERE tournamentId = ? AND areaId = ?`,
          [tournamentId, areaId]
        );
      })
    );
  } catch (error) {
    throw new Error(error);
  }

  await Promise.all(
    newAreas
      .map(async (area) => {
        const dbResponse = await dbConnection.query(
          `INSERT INTO area (name) VALUES (?)`,
          [area]
        );
        return await dbConnection.query(
          `INSERT INTO tournament_area (tournamentId, areaId) VALUES (?, ?)`,
          [tournamentId, dbResponse.insertId]
        );
      })
      .concat(
        alreadyCreatedAreas.map(async (area) => {
          if (
            existingAreasOfTournament.some(
              ({ name }) => name.toLowerCase() === area
            )
          ) {
            return;
          }
          const areaId = existingAreas.find(
            ({ name }) => name.toLowerCase() === area
          ).areaId;
          return await dbConnection.query(
            `INSERT INTO tournament_area (tournamentId, areaId) VALUES (?, ?)`,
            [tournamentId, areaId]
          );
        })
      )
  );

  return 'Areas saved successfully';
};
