import { gql } from '@apollo/client';

export const GET_ALL_TWEETS = gql`
  query getTweets($offset: Int) {
    tweets(offset: $offset) {
      _id
      message
      dateCreated
      comments
      likes {
        _id
        username
        dateCreated
      }
      user {
        _id
        username
      }
    }
  }
`;
