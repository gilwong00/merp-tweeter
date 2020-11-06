import gql from 'graphql-tag';
import { USER_FIELDS } from '../fragments/user';

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      _id
      username
      email
    }
  }
`;

export const AUTH_USER = gql`
  mutation($username: String!, $password: String!) {
    authUser(input: { username: $username, password: $password }) {
      ...UserFields
      token
    }
  }
  ${USER_FIELDS}
`;
