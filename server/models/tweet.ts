import { model, Schema, Document } from 'mongoose';
import { IComment } from './comment';
import { ILike } from './like';
import { IUser } from './user';

interface ITweet extends Document {
  message: string;
  username: string;
  dateCreated: Date;
  comments: Array<IComment>;
  likes: Array<ILike>;
  user: IUser;
}

const tweetSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString()
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Tweet = model<ITweet>('Tweet', tweetSchema);

export default Tweet;
