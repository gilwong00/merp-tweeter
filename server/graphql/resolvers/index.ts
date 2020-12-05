import { IResolvers } from 'graphql-tools';
import * as userMutations from './User/mutations';
import * as userQueries from './User/queries';
import * as tweetMutations from './Tweet/mutations';
import * as tweetQueries from './Tweet/queries';
import * as commentMutations from './Comment/mutations';
// import { withFilter } from 'apollo-server-express';
// import { Context } from 'types/context';

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
  // Subscription: {
  //   newFollow: {
  //     subscribe: withFilter(
  //       (_: any, __: any, ctx: Context) => ctx.pubsub.asyncIterator('FOLLOW'),
  //       (payload: any, args: any) => {
  //         // only send to user that receives the new follow
  //         // check the current user and the userId in the args
  //         console.log(payload);
  //         console.log(args);
  //         return true;
  //       }
  //     )
  //   }
  // }
};

export default resolvers;
