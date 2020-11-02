import { model, Schema, Document } from 'mongoose';

export interface ILike extends Document {
  username: string;
  dateCreated: Date;
  tweetId: string;
}

const likeSchema = new Schema({
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

const Like = model<ILike>('Like', likeSchema);

export default Like;
