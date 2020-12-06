import { User } from '../../../models';

export const findUserByName = async (username: string) =>
  await User.findOne({ username });
