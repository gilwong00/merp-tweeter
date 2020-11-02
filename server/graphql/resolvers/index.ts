import { IResolvers } from 'graphql-tools';
import * as userMutations from './User/mutations';

const resolvers: IResolvers = {
  Query: {
    get: () => {}
  },
  Mutation: {
    ...userMutations
  }
};

export default resolvers;
