import { Request, Response } from 'express';
import { IUser } from 'models/user';

export type Context = {
  req: Request;
  res: Response;
  user?: IUser;
};
