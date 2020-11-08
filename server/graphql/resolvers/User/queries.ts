import { AuthenticationError } from 'apollo-server-express';
import { Context } from 'context';

export const getLoggedInUser = (_: any, {}: any, ctx: Context) => {
  const { user } = ctx;

  if (!user) {
    throw new AuthenticationError('you must be logged in');
  } else {
    return user;
  }
};
