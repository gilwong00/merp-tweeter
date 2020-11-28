import { model, Schema, Document } from 'mongoose';

export interface IFollow extends Document {
  userId: string;
  username: string;
}

const followSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const Follow = model<IFollow>('Follow', followSchema);

export default Follow;
