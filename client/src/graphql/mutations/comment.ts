import { gql } from '@apollo/client';

export const COMMENT_TWEET = gql`
  mutation commentTweet($comment: String!, $username: String!, $tweetId: ID!) {
    comment(
      input: { comment: $comment, username: $username, tweetId: $tweetId }
    ) {
      _id
    }
  }
`;
