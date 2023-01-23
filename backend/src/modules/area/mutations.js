import { validateArea } from './validations';
import { getGroups, removeGroups, saveGroups } from '../commons/sportsAndAreas';
import { resetBlocksOfTournament } from '../block/helper';

export const saveAreas = async (
  _,
  { areas, tournamentId },
  { dbConnection, auth }
) => {
  await validateArea({
    auth,
    dbConnection,
    tournamentId,
    areas,
  });

  const [
    removedAreas,
    newAreas,
    alreadyCreatedAreas,
    existingAreasOfTournament,
    existingAreas,
  ] = await getGroups(areas, 'area', tournamentId, dbConnection);

  await removeGroups(removedAreas, 'area', tournamentId, dbConnection);

  await saveGroups(
    newAreas,
    'area',
    alreadyCreatedAreas,
    existingAreasOfTournament,
    existingAreas,
    tournamentId,
    dbConnection
  );

  return 'Areas saved successfully';
};

export const toggleFlexibleArea = async (
  _,
  { areaId, tournamentId },
  { dbConnection, auth }
) => {
  await validateArea({
    auth,
    dbConnection,
    tournamentId,
    areaId,
  });

  const areas = await dbConnection.query(
    `SELECT flexible FROM tournament_area WHERE areaId = ? AND tournamentId = ?`,
    [areaId, tournamentId]
  );

  const area = areas[0];

  if (!area) {
    throw new Error('Area not found');
  }

  await dbConnection.query(
    `UPDATE tournament_area SET flexible = ? WHERE areaId = ? AND tournamentId = ?`,
    [!area.flexible, areaId, tournamentId]
  );

  await resetBlocksOfTournament('areaId', areaId, dbConnection, tournamentId);

  return 'Area flexibility changed successfully';
};
