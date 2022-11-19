export const typeDef = /* GraphQL */ `
  type Query {
    sports: [Sport!]!
    sport(sportId: Int!): Sport
    sportsOfTournament(tournamentId: Int!): [Sport!]!
    sportsWithSportsOfTournament(
      tournamentId: Int!
    ): SportsWithSportsOfTournament!
  }

  type Mutation {
    saveSports(sports: [String!]!, tournamentId: Int!): String!
  }

  type Sport {
    sportId: Int!
    name: String!
  }

  type SportsWithSportsOfTournament {
    sports: [Sport!]!
    sportsOfTournament: [Sport!]!
  }
`;
