import { Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

interface ITweetArgs {
  input: {
    message: string;
    username: string;
    ownerId: string;
  };
}

export const createTweet = authenticated(async (_: any, args: ITweetArgs) => {
  try {
    return await new Tweet(args.input).save();
  } catch (err) {
    return err;
  }
});
