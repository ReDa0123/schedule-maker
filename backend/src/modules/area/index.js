import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutations';

const resolvers = {
  Query: {
    ...queries,
  },

  Mutation: {
    ...mutations,
  },
};

export { typeDef, resolvers };
