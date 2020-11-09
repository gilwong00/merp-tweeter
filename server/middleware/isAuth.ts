import { AuthenticationError } from 'apollo-server-express';
import { Context } from 'types/context';

const authenticated = (next: any) => (_: any, args: any, ctx: Context) => {
  const { token } = ctx.req.cookies;

  if (token) {
    return next(_, args, ctx);
  } else {
    throw new AuthenticationError('You must be logged in');
  }
};

export default authenticated;
