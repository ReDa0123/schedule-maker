export const typeDef = /* GraphQL */ `
  type Query {
    days: [Day!]!
    day(dayId: Int!): Day
    daysOfTournament(tournamentId: Int!): [Day!]!
  }

  type Mutation {
    createDay(
      date: String!
      tournamentId: Int!
      description: String!
      startTime: Int!
      endTime: Int!
    ): String!
    editDay(
      dayId: Int!
      date: String!
      description: String!
      startTime: Int!
      endTime: Int!
    ): String!
    deleteDay(dayId: Int!): String!
  }

  type Day {
    dayId: Int!
    date: String!
    description: String!
    startTime: Int!
    endTime: Int!
    tournamentId: Int!
  }
`;
