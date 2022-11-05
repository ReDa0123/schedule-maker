import { typeDef } from './schema';
import * as queries from './query';
//import * as mutations from './mutation';

const resolvers = {
  Query: {
    ...queries,
  },
  //Mutation: {
  //  ...mutations,
  //},
  TournamentEnhanced: {
    async sports({ tournamentId }, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
        [tournamentId]
      );
    },
    async areas({ tournamentId }, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM area WHERE tournamentId = ?`,
        [tournamentId]
      );
    },
    async days({ tournamentId }, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM day WHERE tournamentId = ?`,
        [tournamentId]
      );
    },
    async blocks({ tournamentId }, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM block WHERE tournamentId = ?`,
        [tournamentId]
      );
    },
  },
};

export { typeDef, resolvers };
