import getUser from '../user/helper';
import { newTournamentValidationSchema } from './validationSchemas';

export const deleteTournament = async (
  _,
  { tournamentId },
  { dbConnection, auth }
) => {
  const userId = getUser(auth);

  const tournaments = await dbConnection.query(
    `SELECT * FROM tournament WHERE tournamentId = ? AND userId = ?`,
    [tournamentId, userId]
  );

  const tournament = tournaments[0];

  if (!tournament) {
    throw new Error('Tournament not found');
  }

  const deletePromises = [
    dbConnection.query(`DELETE FROM tournament_sport WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`DELETE FROM tournament_area WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`DELETE FROM day WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`DELETE FROM block WHERE tournamentId = ?`, [
      tournamentId,
    ]),
  ];

  await Promise.all(deletePromises);

  await dbConnection.query(`DELETE FROM tournament WHERE tournamentId = ?`, [
    tournamentId,
  ]);

  return 'Tournament deleted';
};

export const createTournament = async (
  _,
  { name, location, startDate, endDate },
  { dbConnection, auth }
) => {
  await newTournamentValidationSchema.validate({
    name,
    location,
    startDate,
    endDate,
  });

  const userId = Number(getUser(auth));
  if (!userId) {
    throw new Error('You are not logged in!');
  }

  const selectQuery = await dbConnection.query(
    `SELECT userId FROM user WHERE userId = ?;`,
    [userId]
  );

  if (!selectQuery[0]) {
    throw new Error('User does not exist in the database');
  }

  const insertQuery = await dbConnection.query(
    `INSERT INTO tournament (name, location, startDate, endDate, userId) VALUES (?, ?, ?, ?, ?);`,
    [name, location, startDate, endDate, userId]
  );

  return Number(insertQuery.insertId);
};
