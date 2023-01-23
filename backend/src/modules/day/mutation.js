import { validateDay } from './validations';
import { resetBlocksOfTournament } from '../block/helper';

export const createDay = async (
  _,
  { tournamentId, date, description, startTime, endTime },
  { dbConnection, auth }
) => {
  await validateDay({
    auth,
    dbConnection,
    tournamentId,
    dayInput: { date, description, startTime, endTime, tournamentId },
  });

  await dbConnection.query(
    `INSERT INTO day (date, description, startTime, endTime, tournamentId) VALUES (?, ?, ?, ?, ?);`,
    [date, description, startTime, endTime, tournamentId]
  );

  return 'Day created successfully';
};

export const editDay = async (
  _,
  { dayId, date, description, startTime, endTime },
  { dbConnection, auth }
) => {
  const day = await dbConnection.query(`SELECT * FROM day WHERE dayId = ?;`, [
    dayId,
  ]);

  const tournamentId = day[0] ? day[0].tournamentId : null;

  await validateDay({
    auth,
    dbConnection,
    tournamentId,
    dayInput: { date, description, startTime, endTime, dayId },
    day,
  });

  await dbConnection.query(
    `UPDATE day SET date = ?, description = ?, startTime = ?, endTime = ? WHERE dayId = ?;`,
    [date, description, startTime, endTime, dayId]
  );

  return 'Day edited successfully';
};

export const deleteDay = async (_, { dayId }, { dbConnection, auth }) => {
  const day = await dbConnection.query(`SELECT * FROM day WHERE dayId = ?;`, [
    dayId,
  ]);

  const tournamentId = day[0] ? day[0].tournamentId : null;

  await validateDay({
    auth,
    dbConnection,
    tournamentId,
    day,
  });

  await resetBlocksOfTournament('dayId', dayId, dbConnection, tournamentId);

  await dbConnection.query(`DELETE FROM day WHERE dayId = ?;`, [dayId]);

  return 'Day deleted successfully';
};
