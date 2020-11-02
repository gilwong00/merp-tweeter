import gql from 'graphql-tag';

export const GET_ALL_TWEETS = gql`
  query($offset: Int) {
    getAllTweets(offset: $offset) {
      _id
      message
      dateCreated
      comments
      likes
      user {
        _id
        username
      }
    }
  }
`;
