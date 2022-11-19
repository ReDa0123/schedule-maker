export const areas = async (_, __, { dbConnection }) =>
  await dbConnection.query(`SELECT * FROM area`);

export const area = async (_, { areaId }, { dbConnection }) => {
  const area = await dbConnection.query(`SELECT * FROM area WHERE areaId = ?`, [
    areaId,
  ]);

  if (!area[0]) {
    throw new Error('Area not found');
  }

  return area[0];
};

export const areasOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) =>
  await dbConnection.query(
    `SELECT * FROM area JOIN tournament_area USING (areaId) WHERE tournamentId = ?`,
    [tournamentId]
  );

export const areasWithAreasOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) => {
  const allAreas = await areas(undefined, undefined, { dbConnection });
  const tournamentAreas = await areasOfTournament(
    undefined,
    { tournamentId },
    { dbConnection }
  );

  return {
    areas: allAreas,
    areasOfTournament: tournamentAreas,
  };
};
