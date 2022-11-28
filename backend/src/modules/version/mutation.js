import { saveBlocks } from '../block/mutation';
import { assoc, filter, map, o, propEq } from 'ramda';
import { validateVersion, validateVersionEdit } from './validations';

export const createVersionWithBlocks = async (
  _,
  { name, tournamentId, blocks, from },
  { dbConnection, auth }
) => {
  await validateVersion({
    name,
    auth,
    dbConnection,
    from,
    tournamentId,
  });

  const dbResponse = await dbConnection.query(
    `INSERT INTO version (name, tournamentId) VALUES (?, ?)`,
    [name, tournamentId]
  );

  const versionId = Number(dbResponse.insertId);

  const versions = await dbConnection.query(
    `SELECT * FROM version WHERE tournamentId = ?`,
    [tournamentId]
  );
  if (versions.length === 1) {
    await dbConnection.query(
      `UPDATE tournament SET versionId = ? WHERE tournamentId = ?`,
      [versionId, tournamentId]
    );
  }

  const newBlocks = o(
    map(assoc('versionId', versionId)),
    filter(propEq('versionId', from))
  )(blocks);

  const createdBlocks = from ? [...blocks, ...newBlocks] : newBlocks;

  await saveBlocks(
    undefined,
    { blocks: createdBlocks, tournamentId },
    { dbConnection, auth }
  );

  return `Version ${name} created`;
};

export const deleteVersion = async (
  _,
  { versionId },
  { dbConnection, auth }
) => {
  const { name, tournamentId } = await validateVersionEdit({
    auth,
    dbConnection,
    versionId,
  });

  //Check if it is the last version
  const versions = await dbConnection.query(
    `SELECT * FROM version WHERE tournamentId = ?`,
    [tournamentId]
  );
  if (versions.length === 1) {
    await dbConnection.query(
      `UPDATE block SET versionId = NULL WHERE versionId = ?`,
      [versionId]
    );
  }

  await dbConnection.query(`DELETE FROM version WHERE versionId = ?`, [
    versionId,
  ]);

  return `Version ${name} deleted successfully.`;
};

export const editVersion = async (
  _,
  { versionId, name },
  { dbConnection, auth }
) => {
  await validateVersionEdit({
    auth,
    dbConnection,
    versionId,
    name,
  });

  await dbConnection.query(`UPDATE version SET name = ? WHERE versionId = ?`, [
    name,
    versionId,
  ]);

  return 'Name changed successfully.';
};
