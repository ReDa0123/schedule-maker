export const typeDef = /* GraphQL */ `
  type Query {
    days: [Day!]!
    day(dayId: Int!): Day
    daysOfTournament(tournamentId: Int!): [Day!]!
  }

  type Mutation {
    createDay(
      name: String!
      tournamentId: Int!
      description: String!
      startTime: Int!
      endTime: Int!
    ): Day!
    editDay(
      dayId: Int!
      name: String!
      tournamentId: Int!
      description: String!
      startTime: Int!
      endTime: Int!
    ): Day!
    deleteDay(dayId: Int!): Day!
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
