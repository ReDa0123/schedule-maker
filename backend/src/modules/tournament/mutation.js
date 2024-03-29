import getUser from '../user/helper';
import { validateTournament } from './validations';

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

export const createTournament = async (_, value, { dbConnection, auth }) => {
  const { name, location, startDate, endDate } = value;
  const userId = Number(getUser(auth));

  await validateTournament({
    value,
    userId,
    dbConnection,
  });

  const insertQuery = await dbConnection.query(
    `INSERT INTO tournament (name, location, startDate, endDate, userId) VALUES (?, ?, ?, ?, ?);`,
    [name, location, startDate, endDate, userId]
  );

  return Number(insertQuery.insertId);
};

export const editTournament = async (
  _,
  {
    name,
    location,
    startDate,
    endDate,
    buffer,
    tournamentId,
    preferredStyle,
    isPublic,
  },
  { dbConnection, auth }
) => {
  const value = {
    name,
    location,
    startDate,
    endDate,
    buffer,
    preferredStyle,
    isPublic,
  };
  const userId = Number(getUser(auth));

  await validateTournament({
    value,
    userId,
    tournamentId,
    dbConnection,
  });

  await dbConnection.query(
    `UPDATE tournament SET name = ?, location = ?, startDate = ?, endDate = ?,  userId = ?, buffer = ?, preferredStyle = ?, isPublic = ? WHERE tournamentId = ?;`,
    [
      name,
      location,
      startDate,
      endDate,
      userId,
      buffer,
      preferredStyle,
      isPublic,
      tournamentId,
    ]
  );

  return 'Tournament edited';
};

export const setMainVersion = async (
  _,
  { versionId, tournamentId },
  { dbConnection, auth }
) => {
  const userId = Number(getUser(auth));
  await validateTournament({
    userId,
    tournamentId,
    dbConnection,
    versionId,
  });

  await dbConnection.query(
    `UPDATE tournament SET versionId = ? WHERE tournamentId = ?`,
    [versionId, tournamentId]
  );

  return 'Main version set successfully';
};
