import { AuthenticationError } from 'apollo-server-express';
import { Context } from 'types/context';
import { verify } from 'jsonwebtoken';

type Token = { userId: string };

const authenticated = (next: any) => (_: any, args: any, ctx: Context) => {
  try {
    const { token } = ctx.req.cookies;

    if (token) {
      const { userId } = verify(
        token,
        process.env.JWT_SECRET as string
      ) as Token;

      ctx.req.userId = userId;
      return next(_, args, ctx);
    } else {
      throw new AuthenticationError('You must be logged in');
    }
  } catch (err) {
    throw err;
  }
};

export default authenticated;
