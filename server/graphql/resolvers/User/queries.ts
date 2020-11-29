import { Context } from 'types/context';
import { User } from '../../../models';
import jwt from 'jsonwebtoken';

type Token = { userId: string };

export const getLoggedInUser = async (_: any, {}: any, ctx: Context) => {
  const { req } = ctx;
  const { token } = req.cookies;
  const { userId } = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as Token;

  if (!userId) return null;
  const user = await User.findOne({ _id: userId });
  return user;
};

export const validateEmail = async (_: any, args: { email: string }) => {
  try {
    const user = await User.findOne({ email: args.email });

    return user ? true : false;
  } catch (err) {
    throw err;
  }
};
