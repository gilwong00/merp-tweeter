import React, { useState, useEffect } from 'react';
import { IUser } from 'Context';
import { Button, Label, Icon } from 'semantic-ui-react';
import { ILike } from '.';

interface IProps {
  user: IUser | null;
  likes: Array<ILike>;
}
const LikeButton: React.FC<IProps> = ({ user, likes }) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user && likes.find((like: ILike) => like.username === user.username))
      setLiked(true);
  }, [user, likes]);

  return (
    <Button as='div' labelPosition='right'>
      <Button color={liked ? 'red' : undefined}>
        <Icon name='heart' />
      </Button>
      <Label basic color='red' pointing='left'>
        {likes.length}
      </Label>
    </Button>
  );
};

export default LikeButton;
