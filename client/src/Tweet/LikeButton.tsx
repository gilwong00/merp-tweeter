import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { ApolloCache } from '@apollo/client/core';
import { LIKE_TWEET, UNLIKE_TWEET } from 'graphql/mutations/tweet';
import { AppContext, IUser } from 'Context';
import { ILike } from '.';
import { Button } from '@chakra-ui/react';

interface IProps {
  user: IUser | null;
  likes: Array<ILike>;
  tweetId: string;
}

interface ILikeUnlikeResult {
  like?: { _id: string };
  unlike?: { _id: string };
}

type LikeAction = 'like' | 'unlike';

const updateLikeCount = (
  tweetId: string,
  cache: ApolloCache<any>,
  data: ILikeUnlikeResult,
  action: LikeAction
): void => {
  const tweet = cache.readFragment<{
    _id: string;
    likes: Array<{ _id: string }>;
  }>({
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
    const likes =
      action === 'like'
        ? [...tweet.likes, { __typename: 'Like', _id: data.like?._id }]
        : [...tweet.likes.filter(like => like._id !== data.unlike?._id)];

    cache.writeFragment({
      id: 'Tweet:' + tweetId,
      fragment: gql`
        fragment likes on Tweet {
          likes {
            _id
          }
        }
      `,
      data: {
        __typename: 'Tweet',
        likes
      }
    });
  }
};

const LikeButton: React.FC<IProps> = ({ user, likes, tweetId }) => {
  const { pushNotification } = useContext(AppContext);
  const [liked, setLiked] = useState<ILike | null>();
  const history = useHistory();
  const [
    like,
    { loading: likeTweetLoading, error: likeTweetError }
  ] = useMutation(LIKE_TWEET, {
    update(cache, { data }) {
      updateLikeCount(tweetId, cache, data, 'like');
    }
  });

  const [
    unlike,
    { loading: unlikeTweetLoading, error: unlikeTweetError }
  ] = useMutation(UNLIKE_TWEET, {
    update(cache, { data }) {
      updateLikeCount(tweetId, cache, data, 'unlike');
    }
  });

  useEffect(() => {
    const likedByUser = likes.find(
      (like: ILike) => like.username === user?.username
    );
    if (user && likedByUser) setLiked(likedByUser);
  }, [user, likes]);

  useEffect(() => {
    if (likeTweetError) pushNotification('error', likeTweetError.message);
    if (unlikeTweetError) pushNotification('error', unlikeTweetError.message);
  }, [pushNotification, likeTweetError, unlikeTweetError]);

  const handleClick = async () => {
    if (!user) return history.push('/login');

    if (liked) {
      await unlike({ variables: { tweetId, likeId: liked?._id } });
      setLiked(null);
    } else {
      await like({ variables: { tweetId, username: user.username } });
    }
  };

  return (
    <Button as='div'>
      <Button
        color={liked ? 'red' : undefined}
        onClick={handleClick}
        isLoading={likeTweetLoading || unlikeTweetLoading}
      >
        ❤️
      </Button>
      {/* <Label basic color='red' pointing='left'>
        {likes.length}
      </Label> */}
    </Button>
  );
};

export default LikeButton;
