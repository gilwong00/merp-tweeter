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

export const createTweet = async (_: any, args: ITweetArgs) => {
  try {
    const created = await new Tweet(args.input).save();

    return await Tweet.findOne({ _id: created._id }).populate({
      path: 'user',
      model: 'User'
    });
  } catch (err) {
    throw err;
  }
};

export const like = authenticated(async (_: any, args: ILikeTweetArgs) => {
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

export const unlike = authenticated(
  async (_: any, args: { input: { likeId: string; tweetId: string } }) => {
    try {
      const { likeId, tweetId } = args.input;

      const res = await Like.findByIdAndRemove({ _id: likeId });

      if (!res) throw new Error('Could not unlike tweet');

      await Tweet.findByIdAndUpdate(
        { _id: tweetId },
        {
          $pull: { likes: likeId }
        }
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
);
