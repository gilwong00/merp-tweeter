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

export const SEARCH_TWEETS = gql`
  query searchTweets($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      _id
      message
      user {
        username
      }
    }
  }
`;
