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
    following: Int!
    followers: Int!
    totalTweets: Int
  }

  type Like {
    _id: ID!
    username: String!
    dateCreated: Date!
    tweetId: ID!
  }

  type Comment {
    _id: ID!
    comment: String!
    username: String!
    tweetId: String!
    dateCreated: Date!
  }

  type Tweet {
    _id: ID!
    message: String!
    dateCreated: Date!
    comments: [Comment]
    likes: [Like]
    user: User!
  }

  type SearchResult {
    _id: ID!
    message: String!
    user: User!
  }

  type Query {
    tweets(offset: Int): [Tweet]
    getLoggedInUser: User
    search(searchTerm: String!): [SearchResult]
    getTweet(tweetId: ID!): Tweet!
    validateEmail(email: String!): Boolean!
    fetchUser(username: String!): User!
    getFollowers(userId: ID!): [ID]
  }

  type Mutation {
    registerUser(input: RegisterInput): User!
    authUser(input: AuthInput): User!
    logout: Boolean!
    createTweet(input: TweetInput): Tweet!
    like(input: LikeInput!): Like!
    unlike(input: UnlikeInput): Like!
    comment(input: CommentInput): Comment!
    changePassword(newPassword: String!, email: String!): User!
    followOrUnfollow(userId: ID!, actionType: String!): ID
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

  input UnlikeInput {
    tweetId: ID!
    likeId: ID!
  }

  input CommentInput {
    comment: String!
    username: String!
    tweetId: ID!
  }
`;

export default typeDefs;
