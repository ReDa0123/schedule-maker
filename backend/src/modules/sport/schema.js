export const typeDef = /* GraphQL */ `
  type Query {
    sports: [Sport!]!
    sport(sportId: Int!): Sport
    sportsOfTournament(tournamentId: Int!): [Sport!]!
  }

  type Mutation {
    saveSports(sports: [String!]!, tournamentId: Int!): String!
  }

  type Sport {
    sportId: Int!
    name: String!
  }
`;
