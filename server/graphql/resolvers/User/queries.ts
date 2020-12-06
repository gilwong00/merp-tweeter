import { Context } from 'types/context';
import { User, Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';
import { findUserByName } from './utils';
import { IUser } from 'models/user';

const createUserPayload = async (user: IUser) => {
  const totalTweets = await Tweet.count({
    user: user._id
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    dateCreated: user.dateCreated,
    following: (user.following ?? []).length,
    followers: (user.followers ?? []).length,
    totalTweets
  };
};

export const getLoggedInUser = authenticated(
  async (_: any, __: any, ctx: Context) => {
    const { userId } = ctx.req;

    if (!userId) return null;
    const user = (await User.findOne({ _id: userId }))?.toObject();

    if (user) {
      return await createUserPayload(user);
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

export const fetchUser = async (_: any, args: { username: string }) => {
  try {
    const user = (await findUserByName(args.username))?.toObject();

    if (user) {
      return await createUserPayload(user);
    } else {
      return new Error('Could not find active user');
    }
  } catch (err) {
    throw err;
  }
};
