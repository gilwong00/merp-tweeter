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
        .populate({ path: 'user', model: 'User' });
    } catch (err) {
      throw err;
    }
  }
);
