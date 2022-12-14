import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
};

export { typeDef, resolvers };
