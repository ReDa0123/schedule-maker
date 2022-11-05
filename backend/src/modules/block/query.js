export const blocks = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM block`);

export const block = async (_, { blockId }, { dbConnection }) => {
  const block = await dbConnection.query(
    `SELECT * FROM block WHERE blockId = ?`,
    [blockId]
  );

  if (!block[0]) {
    throw new Error('Block not found');
  }

  return block[0];
};

export const blocksOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) =>
  await dbConnection.query(`SELECT * FROM block WHERE tournamentId = ?`, [
    tournamentId,
  ]);
