import { model, Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  username: string;
  dateCreated: Date;
  tweetId: string;
}

const commentSchema = new Schema({
  content: {
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
  tweetId: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet'
  }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
