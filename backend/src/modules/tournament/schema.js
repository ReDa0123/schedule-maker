export const typeDef = /* GraphQL */ `
  type Query {
    tournaments: [Tournament!]!
    tournament(tournamentId: Int!): TournamentEnhanced
  }

  type Mutation {
    createTournament(
      name: String!
      location: String!
      startDate: String!
      endDate: String!
      userId: Int!
      sports: [String!]!
    ): Tournament!
    editTournament(
      tournamentId: Int!
      name: String!
      location: String!
      startDate: String!
      endDate: String!
      userId: Int!
      sports: [String!]!
    ): Tournament!
    deleteTournament(tournamentId: Int!): Tournament!
  }

  type Tournament {
    tournamentId: Int!
    name: String!
    location: String!
    startDate: String!
    endDate: String!
    userId: Int!
  }

  type TournamentEnhanced {
    tournamentId: Int!
    name: String!
    location: String!
    startDate: String!
    endDate: String!
    userId: Int!
    sports: [Sport!]!
    areas: [Area!]!
    days: [Day!]!
    blocks: [Block!]!
  }
`;
