import { validateArea } from './validations';
import { getGroups, removeGroups, saveGroups } from '../commons/sportsAndAreas';

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
