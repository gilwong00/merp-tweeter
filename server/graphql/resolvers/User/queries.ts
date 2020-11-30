import { Context } from 'types/context';
import { User, Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

export const getLoggedInUser = authenticated(
  async (_: any, {}: any, ctx: Context) => {
    const { userId } = ctx.req;

    if (!userId) return null;
    const user = await User.findOne({ _id: userId });

    if (user) {
      const totalTweets = await Tweet.count({
        user: user._id
      });

      return { ...user.toObject(), totalTweets };
    } else {
      return new Error('Could not find active user');
    }
  }
);

export const validateEmail = async (_: any, args: { email: string }) => {
  try {
    const user = await User.findOne({ email: args.email });

    return user ? true : false;
  } catch (err) {
    throw err;
  }
};
