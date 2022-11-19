export const sports = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM sport`);

export const sport = async (_, { sportId }, { dbConnection }) => {
  const sport = await dbConnection.query(
    `SELECT * FROM sport WHERE sportId = ?`,
    [sportId]
  );

  if (!sport[0]) {
    throw new Error('Sport not found');
  }

  return sport[0];
};

export const sportsOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) =>
  await dbConnection.query(
    `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
    [tournamentId]
  );

export const sportsWithSportsOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) => {
  const allSports = await sports(undefined, undefined, { dbConnection });
  const tournamentSports = await sportsOfTournament(
    undefined,
    { tournamentId },
    { dbConnection }
  );

  return {
    sports: allSports,
    sportsOfTournament: tournamentSports,
  };
};
