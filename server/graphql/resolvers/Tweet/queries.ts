import { Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

export const getAllTweets = authenticated(
  async (_: any, args: { offset: number }) => {
    try {
      const { offset } = args;
      return await Tweet.find({})
        .limit(10)
        .skip(offset ?? 0)
        .populate({ path: 'user', model: 'User' });
    } catch (err) {
      throw err;
    }
  }
);
