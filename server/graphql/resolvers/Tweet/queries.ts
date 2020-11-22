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
