import { IResolvers } from 'graphql-tools';
import * as userMutations from './User/mutations';
import * as tweetQueries from './Tweet/queries';

const resolvers: IResolvers = {
  Query: {
    get: () => {},
    ...tweetQueries
  },
  Mutation: {
    ...userMutations
  }
};

export default resolvers;
