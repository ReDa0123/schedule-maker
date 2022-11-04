export const typeDef = /* GraphQL */ `
  type Query {
    blocks: [Block!]!
    block(blockId: Int!): Block
    blocksOfTournament(tournamentId: Int!): [Block!]!
  }

  type Mutation {
    createBlock(
      startTime: String!
      persons: Int!
      style: String!
      category: String
      sex: String
      age: String!
      customParameter: String
      tournamentId: Int!
      dayId: Int
      areaId: Int
      sportId: Int!
    ): Block!
  }

  type Block {
    blockId: Int!
    startTime: String!
    persons: Int!
    style: String!
    category: String
    sex: String
    tournamentId: Int!
    dayId: Int
    areaId: Int
    sportId: Int!
    age: String!
    customParameter: String
  }
`;
