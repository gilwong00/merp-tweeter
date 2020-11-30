import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  dateCreated: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString()
  },
  followers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: []
  }
});

const User = model<IUser>('User', userSchema);

export default User;
