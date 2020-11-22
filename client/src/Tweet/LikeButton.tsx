import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LIKE_TWEET } from 'graphql/mutations/tweet';
import { IUser } from 'Context';
import { Button, Label, Icon } from 'semantic-ui-react';
import { ILike } from '.';

interface IProps {
  user: IUser | null;
  likes: Array<ILike>;
  tweetId: string;
}
const LikeButton: React.FC<IProps> = ({ user, likes, tweetId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const history = useHistory();
  const [like, { loading, error }] = useMutation(LIKE_TWEET, {
    update(cache, { data }) {}
  });

  useEffect(() => {
    if (user && likes.find((like: ILike) => like.username === user.username))
      setLiked(true);
  }, [user, likes]);

  const handleClick = async () => {
    if (!user) return history.push('/login');

    await like({ variables: { tweetId, username: user.username } });
  };

  return (
    <Button as='div' labelPosition='right'>
      <Button color={liked ? 'red' : undefined} onClick={handleClick}>
        <Icon name='heart' />
      </Button>
      <Label basic color='red' pointing='left'>
        {likes.length}
      </Label>
    </Button>
  );
};

export default LikeButton;
