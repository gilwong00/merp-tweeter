import { Request, Response } from 'express';
import { IUser } from 'models/user';

interface AuthedRequest extends Request {
  userId: string;
}

export type Context = {
  req: AuthedRequest;
  res: Response;
  user?: IUser;
};
