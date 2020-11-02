import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    password: String
    dateCreated: Date
  }

  type Tweet {
    _id: ID!
    message: String!
    dateCreated: Date!
    comments: [String]
    likes: [String]
    user: User!
  }

  type Query {
    get: String
    getAllTweets(offset: Int): [Tweet]
  }

  type Mutation {
    registerUser(input: RegisterInput): User!
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

export default typeDefs;
