import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import sendResetEmail from './passwordResetMailer';
import {
  emailPasswordValidationSchema,
  emailValidationSchema,
  userValidationSchema,
} from './validationSchemas';

const requestedPasswordResetsMap = new Map();

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
  userValidationSchema.validateSync({ email, password, username });
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

export const requestPasswordReset = async (_, { email }, { dbConnection }) => {
  emailValidationSchema.validateSync({ email });
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    const passwordCode = Math.random().toString(36).substring(2, 12);

    requestedPasswordResetsMap.set(email, passwordCode);
    console.log(
      `Starting email reset procedure for ${email}, was set to ${passwordCode}`
    );
    await sendResetEmail(email, passwordCode);

    return 'Password reset email will be sent!';
  } else {
    throw new Error('Given email was not found in the database!');
  }
};

export const passwordReset = async (
  _,
  { email, code, password },
  { dbConnection }
) => {
  if (requestedPasswordResetsMap.has(email)) {
    if (requestedPasswordResetsMap.get(email) === code) {
      emailPasswordValidationSchema.validateSync({ email, password });

      await dbConnection.query(`UPDATE user SET password = ? WHERE email = ?`, [
        await argon2.hash(password),
        email,
      ]);
      requestedPasswordResetsMap.delete(email);
      console.log(`Password for ${email} was successfully reset to a new one!`);
      return 'Password was successfully reset!';
    } else {
      requestedPasswordResetsMap.delete(email);
      throw new Error(
        'The inserted code is wrong! You will have to request a new one!'
      );
    }
  } else {
    throw new Error(`Password reset for ${email} was not requested!`);
  }
};
