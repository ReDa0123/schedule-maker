import getUser from '../user/helper';
import { getValidationSchema } from './validationSchemas';

export const validateDay = async ({
  auth,
  dbConnection,
  tournamentId,
  dayInput,
  day,
}) => {
  const tournaments = await dbConnection.query(
    `SELECT userId FROM tournament WHERE tournamentId = ?`,
    [tournamentId]
  );
  const tournament = tournaments[0];
  if (!tournament) {
    throw new Error(day ? 'Day not found' : 'Tournament not found');
  }

  const userId = getUser(auth);
  if (tournament.userId !== userId) {
    throw new Error(
      'You are not authorized to create or edit a day for this tournament'
    );
  }

  dayInput && (await getValidationSchema(!day).validate(dayInput));
};
