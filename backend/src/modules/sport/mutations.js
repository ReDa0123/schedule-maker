import { validateSport } from './validations';

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

  const existingSports = await dbConnection.query(`SELECT * FROM sport;`);

  await dbConnection.query(
    `DELETE FROM tournament_sport WHERE tournamentId = ?`,
    [tournamentId]
  );

  for (let i = 0; i < sports.length; i++) {
    const sport = sports[i];
    let sportId;
    const existingSport = existingSports.find(({ name }) => name === sport);
    if (!existingSport) {
      const dbResponse = await dbConnection.query(
        `INSERT INTO sport (name) VALUES (?);`,
        [sport]
      );
      sportId = dbResponse.insertId;
    } else {
      sportId = existingSport.sportId;
    }

    await dbConnection.query(
      `INSERT INTO tournament_sport (tournamentId, sportId) VALUES (?, ?);`,
      [tournamentId, sportId]
    );
  }
  return 'Sports created successfully';
};
