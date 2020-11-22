import { Tweet, Like } from '../../../models';
import authenticated from '../../../middleware/isAuth';

interface ITweetArgs {
  input: {
    message: string;
    username: string;
    ownerId: string;
  };
}

interface ILikeTweetArgs {
  input: {
    tweetId: string;
    username: string;
  };
}

export const createTweet = authenticated(async (_: any, args: ITweetArgs) => {
  try {
    return await new Tweet(args.input).save();
  } catch (err) {
    throw err;
  }
});

export const likeTweet = authenticated(async (_: any, args: ILikeTweetArgs) => {
  try {
    // need to null check input
    const newLike = await new Like(args.input).save();

    if (newLike._id) {
      await Tweet.findByIdAndUpdate(
        { _id: args.input.tweetId },
        {
          $push: { likes: newLike._id }
        }
      );
    }
    return newLike;
  } catch (err) {
    throw err;
  }
});
