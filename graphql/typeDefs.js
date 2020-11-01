const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    get: String
  }

  type Mutation {
    post: String
  }
`;
