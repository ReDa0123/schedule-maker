export const users = async (_, __, { dbConnection }) =>
  await dbConnection.query('SELECT * FROM user');

export const user = async (_, { userId }, { dbConnection }) => {
  const user = await dbConnection.query(`SELECT * FROM user WHERE userId = ?`, [
    userId,
  ]);
  return user[0];
};
