import gql from 'graphql-tag';
import { USER_FIELDS } from '../fragments/user';

export const WHO_AM_I = gql`
  query whoAmI {
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
