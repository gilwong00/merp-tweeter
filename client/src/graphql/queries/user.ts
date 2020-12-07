import { gql } from '@apollo/client';
import { USER_FIELDS } from '../fragments/user';

export const WHO_AM_I = gql`
  query whoAmI {
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const GET_LOGGED_IN_USER = gql`
  query getLoggedInUser {
    getLoggedInUser {
      ...UserFields
      following
      followers
      totalTweets
    }
  }
  ${USER_FIELDS}
`;

export const VALIDATE_EMAIL = gql`
  query validate($email: String!) {
    validateEmail(email: $email)
  }
`;

export const FETCH_USER = gql`
  query getUser($username: String!) {
    fetchUser(username: $username) {
      ...UserFields
      following
      followers
      totalTweets
    }
  }
  ${USER_FIELDS}
`;

export const GET_FOLLOWERS = gql`
  query getFollowers($userId: ID!) {
    getFollowers(userId: $userId)
  }
`;
