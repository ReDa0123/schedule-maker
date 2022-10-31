import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const login = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email]
  );
  const user = dbResponse[0];
  if (!user) {
    throw new Error('Invalid email or password');
  }
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.userId });
    return {
      user: { ...user },
      token,
    };
  }
  throw new Error('Invalid email or password');
};

export const signup = async (
  _,
  { email, password, username },
  { dbConnection }
) => {
  const userByUserName = (
    await dbConnection.query(`SELECT * FROM user WHERE username = ?`, [
      username,
    ])
  )[0];

  if (userByUserName) {
    throw new Error('Username already taken. Please choose another one.');
  }

  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error(
      'Email already registered. Please choose another one or try to login.'
    );
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (email, password, username) 
    VALUES (?, ?, ?);`,
    [email, passwordHash, username]
  );

  const userId = Number(dbResponse.insertId);

  const token = createToken({ id: userId });

  const userObject = {
    userId,
    email,
    username: username,
  };

  return { user: userObject, token: token };
};
