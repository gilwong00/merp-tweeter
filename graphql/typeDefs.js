const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    password: String
    dateCreated: Date
  }

  type Query {
    get: String
  }

  type Mutation {
    register(input: RegisterInput): User!
    authUser(input: AuthInput): String!
  }

  # Inputs
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input AuthInput {
    username: String!
    password: String!
  }
`;
