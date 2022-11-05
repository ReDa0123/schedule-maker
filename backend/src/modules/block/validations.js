import getUser from '../user/helper';
import { getBlockValidationSchema } from './validationSchemas';
import { o, pluck, values } from 'ramda';

const pluckAndValues = (propName) => o(values, pluck(propName));

export const validateBlocks = async ({
  blocks,
  dbConnection,
  tournamentId,
  auth,
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

  const sports = await dbConnection.query(
    `SELECT sportId FROM tournament_sport WHERE tournamentId = ?`,
    [tournamentId]
  );

  const areas = await dbConnection.query(
    `SELECT areaId FROM area WHERE tournamentId = ?`,
    [tournamentId]
  );

  const days = await dbConnection.query(
    `SELECT dayId FROM day WHERE tournamentId = ?`,
    [tournamentId]
  );

  const validationSchema = getBlockValidationSchema({
    sportIds: pluckAndValues('sportId')(sports),
    areaIds: pluckAndValues('areaId')(areas),
    dayIds: pluckAndValues('dayId')(days),
  });

  await Promise.all(
    blocks.map(async (block) => await validationSchema.validate(block))
  );
};
