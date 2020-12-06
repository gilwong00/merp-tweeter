import { IResolvers } from 'graphql-tools';
import * as userMutations from './User/mutations';
import * as userQueries from './User/queries';
import * as tweetMutations from './Tweet/mutations';
import * as tweetQueries from './Tweet/queries';
import * as commentMutations from './Comment/mutations';

const resolvers: IResolvers = {
  Query: {
    ...tweetQueries,
    ...userQueries
  },
  Mutation: {
    ...userMutations,
    ...tweetMutations,
    ...commentMutations
  }
};

export default resolvers;
