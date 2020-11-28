import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ApolloCache } from '@apollo/client/core';
import { LIKE_TWEET, UNLIKE_TWEET } from 'graphql/mutations/tweet';
import { LIKES_FRAGMENT } from 'graphql/fragments/like';
import { IUser } from 'Context';
import { ILike } from '.';
import { useToastNotification } from 'hooks';
import { IconButton, Box, Flex } from '@chakra-ui/react';
import { Heart } from 'react-feather';
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
  const id = `Tweet:${tweetId}`;
  const tweet = cache.readFragment<{
    _id: string;
    likes: Array<{ _id: string }>;
  }>({
    id,
    fragment: LIKES_FRAGMENT
  });

  if (tweet) {
    const likes =
      action === 'like'
        ? [...tweet.likes, { __typename: 'Like', _id: data.like?._id }]
        : [...tweet.likes.filter(like => like._id !== data.unlike?._id)];

    cache.writeFragment({
      id,
      fragment: LIKES_FRAGMENT,
      data: {
        __typename: 'Tweet',
        likes
      }
    });
  }
};

const LikeButton: React.FC<IProps> = ({ user, likes, tweetId }) => {
  const { pushNotification } = useToastNotification();
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
    <Box>
      <IconButton
        w={100}
        isLoading={likeTweetLoading || unlikeTweetLoading}
        variant='outline'
        colorScheme='red'
        aria-label='Like Tweet'
        onClick={handleClick}
        icon={
          <Flex align='center'>
            <Heart fill={likes.length > 0 ? 'red' : 'none'} />
            {likes.length > 0 && <Box pl={2}>{likes.length}</Box>}
          </Flex>
        }
      />
    </Box>
  );
};

export default LikeButton;
