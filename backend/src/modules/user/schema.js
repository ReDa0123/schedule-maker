export const typeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    user(userId: Int!): User
  }

  type Mutation {
    login(email: String!, password: String!): AuthInfo!
    signup(email: String!, password: String!, username: String!): AuthInfo!
    requestPasswordReset(email: String!): String!
    passwordReset(email: String!, code: String!, password: String!): String!
  }

  type User {
    userId: Int!
    username: String!
    email: String!
    password: String!
  }

  type AuthInfo {
    user: User!
    token: String!
  }
`;
