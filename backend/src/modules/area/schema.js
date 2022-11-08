export const typeDef = /* GraphQL */ `
  type Query {
    areas: [Area!]!
    area(areaId: Int!): Area
  }

  type Mutation {
    createArea(name: String!, tournamentId: Int!): Area!
    editArea(areaId: Int!, name: String!): Area!
    deleteArea(areaId: Int!): Area!
  }

  type Area {
    areaId: Int!
    name: String!
    tournamentId: Int!
  }
`;
