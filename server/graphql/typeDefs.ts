import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    dateCreated: Date!
    token: String
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
    getAllTweets(offset: Int): [Tweet]
    getLoggedInUser: User
  }

  type Mutation {
    registerUser(input: RegisterInput): User!
    authUser(input: AuthInput): User!
    logout: Boolean!
    createTweet(input: TweetInput): Tweet!
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

  input TweetInput {
    message: String!
    username: String!
    user: ID!
  }
`;

export default typeDefs;
