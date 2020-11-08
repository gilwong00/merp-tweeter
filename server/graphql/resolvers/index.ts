import { IResolvers } from 'graphql-tools';
import * as userMutations from './User/mutations';
import * as userQueries from './User/queries';
import * as tweetQueries from './Tweet/queries';

const resolvers: IResolvers = {
  Query: {
    ...tweetQueries,
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
};

export default resolvers;
