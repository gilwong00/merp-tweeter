import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUser } from 'Context';
import { ITweet } from 'Tweet';
import LikeButton from './LikeButton';

interface IProps {
  tweet: ITweet;
  user: IUser | null;
}

const Tweet: React.FC<IProps> = ({ tweet, user }) => {
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const date = new Date(tweet.dateCreated);
  const displayDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    new Date(date)
  );

  const displayTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    new Date(date)
  );

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{user?.username}</Card.Header>
        <Card.Meta as={Link} to={`/tweet/${tweet._id}`}>
          {displayDate} at {displayTime}
        </Card.Meta>
        <Card.Description>{tweet.message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} likes={tweet.likes} tweetId={tweet._id} />
      </Card.Content>
    </Card>
  );
};

export default Tweet;
