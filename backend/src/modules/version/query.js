export const versionsOfTournament = async (
  _,
  { tournamentId },
  { dbConnection }
) =>
  await dbConnection.query(`SELECT * FROM version WHERE tournamentId = ?`, [
    tournamentId,
  ]);
