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
    async sports(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM sport JOIN tournament_sport USING (sportId) WHERE tournamentId = ?`,
        [parent.tournamentId]
      );
    },
    async areas(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM area WHERE tournamentId = ?`,
        [parent.tournamentId]
      );
    },
    async days(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM day WHERE tournamentId = ?`,
        [parent.tournamentId]
      );
    },
    async blocks(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT * FROM block WHERE tournamentId = ?`,
        [parent.tournamentId]
      );
    },
  },
};

export { typeDef, resolvers };
