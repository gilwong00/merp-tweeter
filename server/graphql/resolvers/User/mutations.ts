import { User } from '../../../models';
import { Context } from '../../../types/context';
import { AuthenticationError } from 'apollo-server-express';
import { findUserByName } from './utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticated from '../../../middleware/isAuth';

interface IUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

const hashPassword = (password: string): string => {
  if (password && password.length) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } else {
    throw new Error('Password is null or empty');
  }
};

export const registerUser = async (_: any, args: IUserArgs) => {
  try {
    const { username, email, password } = args.input;
    const doesUserExist = await findUserByName(username);

    if (doesUserExist) throw new Error(`Email is already in use`);

    const newUser = await new User({
      username,
      email,
      password: hashPassword(password)
    }).save();

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const authUser = async (_: any, args: IUserArgs, ctx: Context) => {
  try {
    const { username, password } = args.input;
    const user = await findUserByName(username);

    if (!user) throw new Error(`Cannot find user with username ${username}`);

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch)
      throw new AuthenticationError('Passwords do not match');

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000
      }
    );

    ctx.res.cookie('token', token, {
      expires: new Date(Date.now() + 3600000),
      path: '/'
    });

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    };
  } catch (err) {
    throw err;
  }
};

export const logout = async (_: any, {}: IUserArgs, ctx: Context) => {
  const { req } = ctx;
  req.session = null;
  req.cookies = {};
  return true;
};

export const changePassword = async (
  _: any,
  args: { newPassword: string; email: string }
) => {
  try {
    const newPassword = hashPassword(args.newPassword);

    const updatedUser = await User.findOneAndUpdate(
      { email: args.email },
      {
        $set: { password: newPassword }
      }
    );
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

export const followOrUnfollow = authenticated(
  async (
    _: any,
    args: { userId: string; actionType: 'follow' | 'unfollow' },
    ctx: Context
  ) => {
    try {
      const { userId } = ctx.req;

      if (userId) {
        // logged in user followers new user
        const followQuery =
          args.actionType === 'follow'
            ? { $push: { following: args.userId } }
            : { $pull: { following: args.userId } };

        // add a new follower to the user the current user decided to follow
        const followerQuery =
          args.actionType === 'follow'
            ? { $push: { followers: userId } }
            : { $pull: { followers: userId } };

        await User.findOneAndUpdate({ _id: args.userId }, followerQuery);

        const user = await User.findOneAndUpdate({ _id: userId }, followQuery, {
          new: true
        });

        return user?._id;
      } else {
        throw new Error('Missing userId');
      }
    } catch (err) {
      throw err;
    }
  }
);
