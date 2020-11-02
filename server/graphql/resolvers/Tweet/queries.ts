import { Tweet } from '../../../models';

export const getAllTweets = async (_: any, args: { offset: number }) => {
  try {
    const { offset } = args;
    const tweets = await Tweet.find({})
      .limit(10)
      .skip(offset ?? 0)
      .populate({ path: 'user', model: 'User' });
    return tweets;
  } catch (err) {
    throw err;
  }
};
