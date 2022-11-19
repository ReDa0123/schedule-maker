import { newTournamentValidationSchema } from './validationSchemas';

export const validateTournament = async ({
  value,
  userId,
  dbConnection,
  tournamentId,
}) => {
  if (!userId) {
    throw new Error('You are not logged in!');
  }

  const selectQuery = await dbConnection.query(
    `SELECT userId FROM user WHERE userId = ?;`,
    [userId]
  );

  if (!selectQuery[0]) {
    throw new Error('User does not exist!');
  }

  if (tournamentId) {
    const tournamentQuery = await dbConnection.query(
      `SELECT userId FROM tournament WHERE tournamentId = ?;`,
      [tournamentId]
    );

    if (!tournamentQuery[0]) {
      throw new Error('Tournament does not exist!');
    }
  }

  await newTournamentValidationSchema.validate(value);
};
