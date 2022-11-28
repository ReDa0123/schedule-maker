import { saveBlocks } from '../block/mutation';
import { assoc, filter, map, o, propEq } from 'ramda';
import { validateVersion } from './validations';

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

  return versionId;
};
