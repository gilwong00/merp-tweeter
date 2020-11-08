import { NextFunction, Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';

const authenticated = (req: Request, _: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (token) {
    return next();
  } else {
    throw new AuthenticationError('You must be logged in');
  }
};

export default authenticated;
