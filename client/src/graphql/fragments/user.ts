import gql from 'graphql-tag';

export const UserFields = gql`
  fragment UserFields on User {
    _id
    username
    email
  }
`;
