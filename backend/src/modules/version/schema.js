export const typeDef = /* GraphQL */ `
  type Query {
    versionsOfTournament(tournamentId: Int!): [Version!]!
  }

  type Mutation {
    createVersionWithBlocks(
      name: String!
      tournamentId: Int!
      blocks: [BlockInput!]!
      from: Int
    ): String!
    editVersion(name: String!): String!
    deleteVersion(versionId: Int!): String!
  }

  type Version {
    versionId: Int!
    name: String!
    tournamentId: Int!
  }
`;
