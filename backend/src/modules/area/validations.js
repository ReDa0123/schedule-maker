import getUser from '../user/helper';
import { validationSchema } from './validationSchemas';

export const validateArea = async ({
  auth,
  dbConnection,
  tournamentId,
  areas,
}) => {
  const tournaments = await dbConnection.query(
    `SELECT userId FROM tournament WHERE tournamentId = ?`,
    [tournamentId]
  );

  const tournament = tournaments[0];

  if (!tournament) {
    throw new Error('Tournament not found');
  }
  const userId = getUser(auth);

  if (tournament.userId !== userId) {
    throw new Error('You are not authorized to edit this tournament');
  }

  await validationSchema.validate(areas);
};
