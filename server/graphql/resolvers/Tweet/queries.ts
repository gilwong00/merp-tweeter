import { AuthenticationError } from 'apollo-server-express';
import { Context } from 'context';
import { Tweet } from '../../../models';

export const getAllTweets = async (
  _: any,
  args: { offset: number },
  ctx: Context
) => {
  try {
    const { user } = ctx;
    const { offset } = args;

    if (!user) throw new AuthenticationError('you must be logged in');

    const tweets = await Tweet.find({})
      .limit(10)
      .skip(offset ?? 0)
      .populate({ path: 'user', model: 'User' });
    return tweets;
  } catch (err) {
    throw err;
  }
};
