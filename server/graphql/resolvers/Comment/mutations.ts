import { Comment, Tweet } from '../../../models';
import authenticated from '../../../middleware/isAuth';

interface ICommentArgs {
  input: {
    comment: string;
    username: string;
    tweetId: string;
  };
}

export const comment = authenticated(async (_: any, args: ICommentArgs) => {
  try {
    const newComment = await new Comment(args.input).save();

    if (!newComment._id) throw new Error('Could not add comment');

    await Tweet.findByIdAndUpdate(
      { _id: args.input.tweetId },
      { $push: { comments: newComment._id } }
    );

    return newComment;
  } catch (err) {
    throw err;
  }
});
