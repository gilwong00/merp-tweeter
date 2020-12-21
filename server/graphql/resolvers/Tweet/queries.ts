import { Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

const LIMIT = 6;

export const tweets = authenticated(
  async (_: any, args: { cursor: string }) => {
    try {
      const { cursor } = args;
      const query = cursor ? { dateCreated: { $lt: new Date(cursor) } } : {};
      return await Tweet.find(query)
        .limit(LIMIT)
        .sort({ dateCreated: -1 })
        .populate({ path: 'user', model: 'User' })
        .populate({ path: 'likes', model: 'Like' });
    } catch (err) {
      throw err;
    }
  }
);

export const search = authenticated(
  async (_: any, args: { searchTerm: string }) => {
    try {
      const { searchTerm } = args;

      if (!searchTerm) throw new Error('No search term provided');

      const tweets = await Tweet.find({
        message: { $regex: searchTerm, $options: 'i' }
      }).populate({ path: 'user', model: 'User' });

      return tweets;
    } catch (err) {
      throw err;
    }
  }
);

export const getTweet = async (_: any, args: { tweetId: string }) => {
  try {
    const tweet = await Tweet.findOne({ _id: args.tweetId })
      .populate({ path: 'likes', model: 'Like' })
      .populate({ path: 'comments', model: 'Comment' })
      .populate({ path: 'user', model: 'User' });

    if (!tweet) throw new Error(`Could not find tweet with id ${args.tweetId}`);

    return tweet;
  } catch (err) {
    throw err;
  }
};
