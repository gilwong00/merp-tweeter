export { default as Tweet } from './Tweet';
export { default as NewTweet } from './NewTweet';
export { default as LikeButton } from './LikeButton';
export { default as CommentButton } from './CommentButton';
export { default as TweetDetails } from './TweetDetails';

export interface IComment {
  _id: string;
  comment: string;
  username: string;
  dateCreated: Date;
  tweetId: string;
}

export interface ILike {
  _id: string;
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
