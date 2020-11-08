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
    username
    email
    dateCreated
  }
`;
