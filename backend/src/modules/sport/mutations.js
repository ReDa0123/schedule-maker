import { validateSport } from './validations';
import { getGroups, removeGroups, saveGroups } from '../commons/sportsAndAreas';

export const saveSports = async (
  _,
  { sports, tournamentId },
  { dbConnection, auth }
) => {
  await validateSport({
    auth,
    dbConnection,
    tournamentId,
    sports,
  });

  const [
    removedSports,
    newSports,
    alreadyCreatedSports,
    existingSportsOfTournament,
    existingSports,
  ] = await getGroups(sports, 'sport', tournamentId, dbConnection);

  await removeGroups(removedSports, 'sport', tournamentId, dbConnection, true);

  await saveGroups(
    newSports,
    'sport',
    alreadyCreatedSports,
    existingSportsOfTournament,
    existingSports,
    tournamentId,
    dbConnection
  );

  return 'Sports saved successfully';
};
