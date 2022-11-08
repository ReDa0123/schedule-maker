//TODO: Limit the number of tournaments returned
export const tournaments = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM tournament`);

export const tournament = async (_, { tournamentId }, { dbConnection }) => {
  const tournaments = await dbConnection.query(
    `SELECT * FROM tournament WHERE tournamentId = ?`,
    [tournamentId]
  );

  const tournament = tournaments[0];

  if (!tournament) {
    throw new Error('Tournament not found');
  }

  const sportsOfTournament = await dbConnection.query(
    `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
    [tournamentId]
  );

  const areasOfTournament = await dbConnection.query(
    `SELECT * FROM area JOIN tournament_area USING (areaId) WHERE tournamentId = ?`,
    [tournamentId]
  );

  const daysOfTournament = await dbConnection.query(
    `SELECT * FROM day WHERE tournamentId = ?`,
    [tournamentId]
  );

  const blocksOfTournament = await dbConnection.query(
    `SELECT * FROM block WHERE tournamentId = ?`,
    [tournamentId]
  );

  return {
    ...tournament,
    sports: sportsOfTournament,
    areas: areasOfTournament,
    days: daysOfTournament,
    blocks: blocksOfTournament,
  };
};
