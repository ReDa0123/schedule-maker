import getUser from '../user/helper';
import { getBlockValidationSchema } from './validationSchemas';
import { o, pluck, values } from 'ramda';

const pluckAndValues = (propName) => o(values, pluck(propName));

export const validateTournamentOwnership = async (
  dbConnection,
  tournamentId,
  auth
) => {
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
};

export const validateBlocks = async ({
  blocks,
  dbConnection,
  tournamentId,
  auth,
}) => {
  await validateTournamentOwnership(dbConnection, tournamentId, auth);

  const validationSchema = await prepareBlocksValidationSchema({
    dbConnection,
    tournamentId,
  });

  await Promise.all(
    blocks.map(async (block) => await validationSchema.validate(block))
  );
};

export const prepareBlocksValidationSchema = async ({
  dbConnection,
  tournamentId,
}) => {
  const [sports, areas, days, versions] = await Promise.all([
    dbConnection.query(
      `SELECT sportId FROM tournament_sport WHERE tournamentId = ?`,
      [tournamentId]
    ),
    dbConnection.query(
      `SELECT * FROM area JOIN tournament_area USING (areaId) WHERE tournamentId = ?`,
      [tournamentId]
    ),
    dbConnection.query(`SELECT dayId FROM day WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`SELECT versionId FROM version WHERE tournamentId = ?`, [
      tournamentId,
    ]),
  ]);

  return getBlockValidationSchema({
    sportIds: pluckAndValues('sportId')(sports),
    areaIds: pluckAndValues('areaId')(areas),
    dayIds: pluckAndValues('dayId')(days),
    versionIds: pluckAndValues('versionId')(versions),
  });
};

export const validateBlock = async ({ block, dbConnection, tournamentId }) => {
  const validationSchema = await prepareBlocksValidationSchema({
    dbConnection,
    tournamentId,
  });

  await validationSchema.validate(block, { abortEarly: false });
};
