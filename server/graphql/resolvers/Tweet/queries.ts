import { Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

const LIMIT = 5;

export const tweets = authenticated(
  async (_: any, args: { offset: number }) => {
    try {
      const { offset } = args;
      return await Tweet.find({})
        .limit(LIMIT)
        .skip((offset ?? 0) * LIMIT)
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
      });

      return tweets;
    } catch (err) {
      throw err;
    }
  }
);
