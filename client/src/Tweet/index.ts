export { default as Tweet } from './Tweet';
export { default as NewTweet } from './NewTweet';

export interface IComment {
  content: string;
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
}
