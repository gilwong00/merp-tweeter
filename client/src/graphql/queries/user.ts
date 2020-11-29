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
    }
  }
  ${USER_FIELDS}
`;

export const VALIDATE_EMAIL = gql`
  query validate($email: String!) {
    validateEmail(email: $email)
  }
`;
