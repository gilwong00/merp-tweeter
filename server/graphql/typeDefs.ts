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

  type Like {
    _id: ID!
    username: String!
    dateCreated: Date!
    tweetId: ID!
  }

  type Tweet {
    _id: ID!
    message: String!
    dateCreated: Date!
    comments: [String]
    likes: [Like]
    user: User!
  }

  type Query {
    tweets(offset: Int): [Tweet]
    getLoggedInUser: User
    search(searchTerm: String!): [Tweet]
  }

  type Mutation {
    registerUser(input: RegisterInput): User!
    authUser(input: AuthInput): User!
    logout: Boolean!
    createTweet(input: TweetInput): Tweet!
    like(input: LikeInput!): Like
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

  input LikeInput {
    tweetId: ID!
    username: String!
  }
`;

export default typeDefs;
