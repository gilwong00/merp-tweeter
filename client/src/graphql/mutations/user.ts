import { gql } from '@apollo/client';
import { USER_FIELDS } from '../fragments/user';

export const REGISTER_USER = gql`
  mutation createNewUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
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
  mutation login($username: String!, $password: String!) {
    authUser(input: { username: $username, password: $password }) {
      ...UserFields
      token
    }
  }
  ${USER_FIELDS}
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($email: String!, $newPassword: String!) {
    changePassword(email: $email, newPassword: $newPassword) {
      _id
    }
  }
`;
