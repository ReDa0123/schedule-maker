import getUser from '../user/helper';
import * as yup from 'yup';

const versionNameValidationSchema = yup.string().max(50).required();

export const validateVersion = async ({
  name,
  auth,
  dbConnection,
  from,
  tournamentId,
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

  if (from) {
    const version = await dbConnection.query(
      `SELECT versionId FROM version WHERE tournamentId = ? AND versionId = ?`,
      [tournamentId, from]
    );

    if (!version[0]) {
      throw new Error(
        "The version from which you want to create a new version doesn't exist"
      );
    }
  }

  await versionNameValidationSchema.validate(name);
};

export const validateVersionEdit = async ({
  auth,
  dbConnection,
  versionId,
  name,
}) => {
  const versionQuery = await dbConnection.query(
    `SELECT * FROM version WHERE versionId = ?`,
    [versionId]
  );
  const version = versionQuery[0];

  if (!version) {
    throw new Error('Version does not exist');
  }

  const tournamentQuery = await dbConnection.query(
    `SELECT * FROM tournament WHERE tournamentId = ?`,
    [version.tournamentId]
  );
  const tournament = tournamentQuery[0];

  const userId = getUser(auth);
  if (tournament.userId !== userId) {
    throw new Error('You do not have permission to edit this tournament.');
  }

  name && (await versionNameValidationSchema.validate(name));

  return version;
};
