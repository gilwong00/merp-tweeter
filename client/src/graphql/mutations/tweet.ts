import { gql } from '@apollo/client';

export const CREATE_TWEET = gql`
  mutation createTweet($message: String!, $username: String!, $user: ID!) {
    createTweet(
      input: { message: $message, username: $username, user: $user }
    ) {
      _id
      message
      dateCreated
      comments
      likes {
        _id
      }
      user {
        _id
        username
      }
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation likeTweet($tweetId: ID!, $username: String!) {
    like(input: { tweetId: $tweetId, username: $username }) {
      _id
      username
      dateCreated
      tweetId
    }
  }
`;

export const UNLIKE_TWEET = gql`
  mutation unlikeTweet($tweetId: ID!, $likeId: ID!) {
    unlike(input: { tweetId: $tweetId, likeId: $likeId }) {
      _id
      tweetId
    }
  }
`;
