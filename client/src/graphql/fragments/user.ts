import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    _id
    username
    email
    token
  }
`;

export const FOLLOWING_FRAGMENT = gql`
  fragment UserFollowing on User {
    _id
    followinbg
  }
`;
