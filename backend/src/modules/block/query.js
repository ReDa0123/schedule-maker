export const blocks = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM block`);

export const block = async (_, { blockId }, { dbConnection }) => {
  const block = await dbConnection.query(
    `SELECT * FROM block WHERE blockId = ?`,
    [blockId]
  );

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
