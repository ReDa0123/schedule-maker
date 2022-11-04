import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as User, resolvers as userResolvers } from './user/';
import { typeDef as Area, resolvers as areaResolvers } from './area/';
import { typeDef as Day, resolvers as dayResolvers } from './day/';
import { typeDef as Block, resolvers as blockResolvers } from './block/';
import { typeDef as Sport, resolvers as sportResolvers } from './sport/';
import {
  typeDef as Tournament,
  resolvers as tournamentResolvers,
} from './tournament/';

// based on - https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const Query = /* GraphQL */ `
  type Query {
    _empty: String
  }
`;

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Area, Day, Block, Sport, Tournament],
  resolvers: merge(
    resolvers,
    userResolvers,
    areaResolvers,
    dayResolvers,
    blockResolvers,
    sportResolvers,
    tournamentResolvers
  ),
});
