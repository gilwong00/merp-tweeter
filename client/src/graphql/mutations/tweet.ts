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
      likes
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation likeTweet($tweetId: String!, $username: String!) {
    like(input: { tweetId: $tweetId, username: $username }) {
      _id
      username
      dateCreated
      tweetId
    }
  }
`;
