export { default as Tweet } from './Tweet';
export { default as NewTweet } from './NewTweet';
export { default as LikeButton } from './LikeButton';

export interface IComment {
  content: string;
  username: string;
  dateCreated: Date;
  tweetId: string;
}

export interface ILike {
  username: string;
  dateCreated: Date;
  tweetId: string;
}

export interface ITweet {
  _id: string;
  message: string;
  username: string;
  dateCreated: Date;
  comments: Array<IComment>;
  likes: Array<ILike>;
}
