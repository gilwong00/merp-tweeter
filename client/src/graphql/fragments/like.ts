import { gql } from '@apollo/client';

export const LIKES_FRAGMENT = gql`
  fragment currentLikes on Tweet {
    likes {
      _id
    }
  }
`;
