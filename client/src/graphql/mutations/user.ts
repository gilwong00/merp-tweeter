import gql from 'graphql-tag';

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
