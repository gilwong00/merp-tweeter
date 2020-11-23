import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
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
    update(cache, { data }) {
      const tweet = cache.readFragment<{ _id: string; likes: Array<string> }>({
        id: 'Tweet:' + tweetId,
        fragment: gql`
          fragment currentLikes on Tweet {
            likes {
              _id
            }
          }
        `
      });

      if (tweet) {
        cache.writeFragment({
          id: 'Tweet:' + tweetId,
          fragment: gql`
            fragment newLike on Tweet {
              likes {
                _id
              }
            }
          `,
          data: {
            __typename: 'Tweet',
            likes: [...tweet.likes, { __typename: 'Like', _id: data.like._id }]
          }
        });
      }
    }
  });

  useEffect(() => {
    if (user && likes.find((like: ILike) => like.username === user.username))
      setLiked(true);
  }, [user, likes]);

  const handleClick = async () => {
    if (!user) return history.push('/login');
    // need to also handle the case where if the user clicks the same tweet unlike
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
