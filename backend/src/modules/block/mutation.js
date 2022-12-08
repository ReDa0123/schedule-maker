import { validateBlocks } from './validations';

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
