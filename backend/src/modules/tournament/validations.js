import { newTournamentValidationSchema } from './validationSchemas';

export const validateTournament = async ({ value, userId, dbConnection }) => {
  if (!userId) {
    throw new Error('You are not logged in!');
  }

  const selectQuery = await dbConnection.query(
    `SELECT userId FROM user WHERE userId = ?;`,
    [userId]
  );

  if (!selectQuery[0]) {
    throw new Error('User does not exist in the database');
  }

  await newTournamentValidationSchema.validate(value);
};
