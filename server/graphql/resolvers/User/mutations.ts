import { User } from 'models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUserArgs {
  username: string;
  email: string;
  password: string;
}

const hashPassword = (password: string): string => {
  if (password && password.length) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } else {
    throw new Error('Password is null or empty');
  }
};

const findUserByName = async (username: string) =>
  await User.findOne({ username });

export const register = async (_: any, args: IUserArgs) => {
  try {
    const { username, email, password } = args;
    const doesUserExist = await findUserByName(username);

    if (doesUserExist) {
      throw new Error(`Email is already in use`);
    }

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

export const authUser = async (_: any, args: IUserArgs) => {
  try {
    const { username, password } = args;
    const user = await findUserByName(username);

    if (!user) {
      throw new Error(`Cannot find user with username ${username}`);
    }

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000
      }
    );

    return token;
  } catch (err) {
    throw err;
  }
};
