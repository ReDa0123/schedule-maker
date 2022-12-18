import {
  validateBlock,
  validateBlocks,
  validateTournamentOwnership,
} from './validations';
import xlsx from 'node-xlsx';
import { prop, values } from 'ramda';
import { convertTime, errorMessages, streamToBuffer } from './helper';

export const saveBlocks = async (
  _,
  { blocks, tournamentId },
  { dbConnection, auth }
) => {
  await validateBlocks({ blocks, dbConnection, tournamentId, auth });

  await dbConnection.query(`DELETE FROM block WHERE tournamentId = ?;`, [
    tournamentId,
  ]);
  await Promise.all(
    blocks.map(
      async ({
        startTime,
        persons,
        style,
        category,
        sex,
        dayId,
        areaId,
        sportId,
        age,
        customParameter,
        versionId,
        matchDuration,
      }) =>
        await dbConnection.query(
          `INSERT INTO block (
        startTime, persons, style, category, sex, tournamentId, 
        dayId, areaId, sportId, age, customParameter, versionId, matchDuration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            startTime,
            persons,
            style,
            category,
            sex,
            tournamentId,
            dayId,
            areaId,
            sportId,
            age,
            customParameter,
            versionId,
            matchDuration,
          ]
        )
    )
  );

  return 'Blocks saved';
};

export const batchUploadBlocks = async (
  _,
  { file, tournamentId, versionId },
  { dbConnection, auth }
) => {
  await validateTournamentOwnership(dbConnection, tournamentId, auth);

  const { createReadStream, filename } = await file;

  if (!filename.endsWith('.xlsx')) {
    throw new Error('Wrong file format. Provide .xlsx file');
  }

  const stream = createReadStream();
  const buffer = await streamToBuffer(stream);
  const data = xlsx.parse(buffer)[0].data;
  if (data.length <= 1) {
    throw new Error('Empty file');
  }
  const errors = [];
  const blocks = [];
  for (let i = 1; i < data.length; i++) {
    const [category, persons, style, sport, sex, age, customParam, duration] =
      data[i];
    const sports = await dbConnection.query(
      `SELECT sportId FROM sport WHERE name = ?;`,
      [sport]
    );
    const sportId = sports[0];

    let durationInSecs;
    if (!isNaN(Number(duration))) {
      durationInSecs = duration;
    } else {
      durationInSecs = convertTime(duration);
    }

    const categories = await dbConnection.query(
      `SELECT blockId FROM block WHERE category = ? AND tournamentId = ? AND versionId ${
        versionId === null ? 'IS NULL' : '= ?'
      };`,
      [category, tournamentId, versionId]
    );

    if (categories[0] || blocks.some((blockArr) => blockArr[3] === category)) {
      errors.push({
        message: `Take notice: block in row ${i} with category ${category} already exists`,
        severity: 'warn',
      });
    }

    //Order is important
    const block = {
      startTime: null,
      persons,
      style,
      category: category ? category : null,
      sex: sex ? sex : null,
      dayId: null,
      areaId: null,
      sportId: prop('sportId', sportId) ? prop('sportId', sportId) : null,
      age: age,
      customParameter: customParam ? customParam : null,
      versionId,
      matchDuration: durationInSecs,
    };

    try {
      await validateBlock({
        block,
        dbConnection,
        tournamentId,
      });
      blocks.push([...values(block), tournamentId]);
    } catch ({ inner }) {
      inner.forEach(({ path }) => {
        errors.push({
          severity: 'error',
          message: errorMessages[path](i + 1),
        });
      });
    }
  }

  if (
    errors.length === 0 ||
    errors.every((error) => error.severity === 'warn')
  ) {
    console.log('blocks');
    blocks.map(async (blockArr) =>
      dbConnection.query(
        `INSERT INTO block (
    startTime, persons, style, category, sex, 
    dayId, areaId, sportId, age, customParameter, versionId, matchDuration, tournamentId
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        blockArr
      )
    );
  }

  return errors;
};
