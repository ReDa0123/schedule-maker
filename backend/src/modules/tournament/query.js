import getUser from '../user/helper';
import { reject } from 'ramda';
import { isNilOrEmpty } from 'ramda-extension';

export const tournaments = async (_, __, { dbConnection, auth }) => {
  const userId = getUser(auth);
  const query = `isPublic = 1 ${userId ? 'OR userId = ?' : ''}`;
  return await dbConnection.query(
    `SELECT * FROM tournament WHERE ${query}`,
    reject(isNilOrEmpty)([userId])
  );
};

export const tournament = async (_, { tournamentId }, { dbConnection }) => {
  const tournaments = await dbConnection.query(
    `SELECT * FROM tournament WHERE tournamentId = ?`,
    [tournamentId]
  );

  const tournament = tournaments[0];

  if (!tournament) {
    throw new Error('Tournament not found');
  }

  const [
    sportsOfTournament,
    areasOfTournament,
    daysOfTournament,
    blocksOfTournament,
    versionsOfTournament,
  ] = await Promise.all([
    dbConnection.query(
      `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
      [tournamentId]
    ),
    dbConnection.query(
      `SELECT * FROM area JOIN tournament_area USING (areaId) WHERE tournamentId = ?`,
      [tournamentId]
    ),
    dbConnection.query(`SELECT * FROM day WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`SELECT * FROM block WHERE tournamentId = ?`, [
      tournamentId,
    ]),
    dbConnection.query(`SELECT * FROM version WHERE tournamentId = ?`, [
      tournamentId,
    ]),
  ]);

  return {
    ...tournament,
    sports: sportsOfTournament,
    areas: areasOfTournament,
    days: daysOfTournament,
    blocks: blocksOfTournament,
    versions: versionsOfTournament,
  };
};
