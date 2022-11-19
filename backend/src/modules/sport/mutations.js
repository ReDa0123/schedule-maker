import { validateSport } from './validations';
import { map, o, prop, toLower, trim } from 'ramda';

export const saveSports = async (
  _,
  { sports, tournamentId },
  { dbConnection, auth }
) => {
  await validateSport({
    auth,
    dbConnection,
    tournamentId,
    sports,
  });
  const sportsInLowerCase = map(o(trim, toLower), sports);
  const existingSports = await dbConnection.query(`SELECT * FROM sport;`);
  const existingSportsOfTournament = await dbConnection.query(
    `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
    [tournamentId]
  );
  const existingSportsNames = map(o(toLower, prop('name')))(existingSports);
  const { newSports, alreadyCreatedSports } = sportsInLowerCase.reduce(
    (acc, sport) => {
      if (existingSportsNames.includes(sport)) {
        acc.alreadyCreatedSports.push(sport);
      } else {
        acc.newSports.push(sport);
      }
      return acc;
    },
    { newSports: [], alreadyCreatedSports: [] }
  );
  const removedSports = existingSportsOfTournament.filter(
    (sport) => !sportsInLowerCase.includes(sport.name.toLowerCase())
  );

  try {
    await Promise.all(
      removedSports.map(async ({ sportId, name }) => {
        const blockAssigned = await dbConnection.query(
          `SELECT blockId FROM block WHERE tournamentId = ? AND sportId = ?`,
          [tournamentId, sportId]
        );
        if (blockAssigned.length > 0) {
          throw new Error(
            `Sport ${name} is assigned to a block. Please remove the sport from the block before removing it from the tournament.`
          );
        }
        return await dbConnection.query(
          `DELETE FROM tournament_sport WHERE tournamentId = ? AND sportId = ?`,
          [tournamentId, sportId]
        );
      })
    );
  } catch (error) {
    throw new Error(error);
  }

  await Promise.all(
    newSports
      .map(async (sport) => {
        const dbResponse = await dbConnection.query(
          `INSERT INTO sport (name) VALUES (?)`,
          [sport]
        );
        return await dbConnection.query(
          `INSERT INTO tournament_sport (tournamentId, sportId) VALUES (?, ?)`,
          [tournamentId, dbResponse.insertId]
        );
      })
      .concat(
        alreadyCreatedSports.map(async (sport) => {
          if (
            existingSportsOfTournament.some(
              ({ name }) => name.toLowerCase() === sport
            )
          ) {
            return;
          }
          const sportId = existingSports.find(
            ({ name }) => name.toLowerCase() === sport
          ).sportId;
          return await dbConnection.query(
            `INSERT INTO tournament_sport (tournamentId, sportId) VALUES (?, ?)`,
            [tournamentId, sportId]
          );
        })
      )
  );

  return 'Sports created successfully';
};
