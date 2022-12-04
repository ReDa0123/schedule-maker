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
    ): Int!
    editTournament(
      tournamentId: Int!
      name: String!
      location: String!
      startDate: String!
      endDate: String!
      preferredStyle: String
    ): String!
    deleteTournament(tournamentId: Int!): String!
    setMainVersion(tournamentId: Int!, versionId: Int!): String!
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
    preferredStyle: String
    sports: [Sport!]!
    areas: [Area!]!
    days: [Day!]!
    blocks: [Block!]!
    versions: [Version!]!
    versionId: Int
  }
`;
