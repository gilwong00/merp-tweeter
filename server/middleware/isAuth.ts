import { Request } from 'express';
import { User } from '../models';
import { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

type Token = { userId: string };

const getUser = async (req: Request): Promise<IUser | null> => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Token;

    if (!userId) return null;

    const user = await User.findOne({ _id: userId });
    return user;
  } else {
    return null;
  }
};

export default getUser;
