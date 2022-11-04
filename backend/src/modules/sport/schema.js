export const typeDef = /* GraphQL */ `
  type Query {
    sports: [Sport!]!
    sport(sportId: Int!): Sport
    sportsOfTournament(tournamentId: Int!): [Sport!]!
  }

  type Mutation {
    createSport(name: String!): Sport!
    editSport(sportId: Int!, name: String!): Sport!
    deleteSport(sportId: Int!): Sport!
  }

  type Sport {
    sportId: Int!
    name: String!
  }
`;
