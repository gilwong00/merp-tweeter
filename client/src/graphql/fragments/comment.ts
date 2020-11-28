import { gql } from '@apollo/client';

export const COMMENT_FRAGMENT = gql`
  fragment comment on Tweet {
    _id
    comments
  }
`;
