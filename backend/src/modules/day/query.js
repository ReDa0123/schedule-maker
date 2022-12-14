export const days = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM day`);

export const day = async (_, { dayId }, { dbConnection }) => {
  const day = await dbConnection.query(`SELECT * FROM day WHERE dayId = ?`, [
    dayId,
  ]);

  if (!day[0]) {
    throw new Error('Day not found');
  }

  return day[0];
};

export const daysOfTournament = async (_, { tournamentId }, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM day WHERE tournamentId = ?`, [
    tournamentId,
  ]);
