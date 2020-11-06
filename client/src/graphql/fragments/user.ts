import gql from 'graphql-tag';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    _id
    username
    email
    token
  }
`;
