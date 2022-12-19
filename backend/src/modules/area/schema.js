export const typeDef = /* GraphQL */ `
  type Query {
    areas: [Area!]!
    area(areaId: Int!): Area
    areasOfTournament(tournamentId: Int!): [Area!]!
    areasWithAreasOfTournament(tournamentId: Int!): AreasWithAreasOfTournament!
  }

  type Mutation {
    saveAreas(areas: [String!]!, tournamentId: Int!): String!
    toggleFlexibleArea(areaId: Int!, tournamentId: Int!): String!
  }

  type Area {
    areaId: Int!
    name: String!
    tournamentId: Int!
    flexible: Boolean!
  }

  type AreasWithAreasOfTournament {
    areas: [Area!]!
    areasOfTournament: [Area!]!
  }
`;
