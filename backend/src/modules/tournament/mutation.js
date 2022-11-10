import getUser from '../user/helper';

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
