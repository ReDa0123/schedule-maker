import { STYLES } from '../constants';

export const resetBlocks = async (column, value, dbConnection) =>
  await dbConnection.query(
    `UPDATE block SET dayId = NULL, areaId = NULL, startTime = NULL WHERE ${column} = ?;`,
    [value]
  );

export const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });

export const convertTime = (time) => {
  const [mins, secs] = time.split(':');
  return Number(mins) * 60 + Number(secs);
};

export const errorMessages = {
  category: (row) =>
    `Category in row ${row} must be a string of max 50 characters or empty`,
  persons: (row) => `Persons in row ${row} must be a positive integer`,
  style: (row) =>
    `Style in row ${row} must be one of the following styles: ${STYLES.join(
      ', '
    )}`,
  sportId: (row) =>
    `Sport in row ${row} must be one of the sports in the tournament`,
  sex: (row) => `Sex in row ${row} must be empty or one of the following: M, F`,
  age: (row) => `Age in row ${row} must be a string of max 50 characters`,
  customParameter: (row) =>
    `Custom parameter in row ${row} must be a string of max 50 characters or empty`,
  matchDuration: (row) =>
    `Match duration in row ${row} must be a positive integer or a string in format mm:ss`,
};
