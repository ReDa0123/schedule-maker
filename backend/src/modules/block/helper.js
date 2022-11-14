export const resetBlocks = async (column, value, dbConnection) =>
  await dbConnection.query(
    `UPDATE block SET dayId = NULL, areaId = NULL, startTime = NULL WHERE ${column} = ?;`,
    [value]
  );
