const blockDef = `
  startTime: Int
  persons: Int!
  style: String!
  category: String
  sex: String
  dayId: Int
  areaId: Int
  sportId: Int!
  age: String!
  customParameter: String
  versionId: Int
`;

export const typeDef = /* GraphQL */ `
  type Query {
    blocks: [Block!]!
    block(blockId: Int!): Block
    blocksOfTournament(tournamentId: Int!): [Block!]!
  }

  type Mutation {
    saveBlocks(
      blocks: [BlockInput!]!
      tournamentId: Int!
    ): String!
  }

  type Block {
    blockId: Int!
    tournamentId: Int!
    ${blockDef}
  }

  input BlockInput {
    ${blockDef}
  }
`;
