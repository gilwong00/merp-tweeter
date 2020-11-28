import { gql } from '@apollo/client';

export const GET_ALL_TWEETS = gql`
  query getTweets($offset: Int) {
    tweets(offset: $offset) {
      _id
      message
      dateCreated
      comments {
        _id
      }
      likes {
        _id
        username
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

export const GET_TWEET = gql`
  query getTweetById($tweetId: ID!) {
    getTweet(tweetId: $tweetId) {
      _id
      message
      comments {
        _id
        comment
        username
      }
      likes {
        _id
        username
      }
      user {
        _id
        username
      }
    }
  }
`;
