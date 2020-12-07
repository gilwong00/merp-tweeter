import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'Context';
import { ITweet } from 'Tweet';
import { DateDisplay } from 'DateDisplay';
import { Box, Avatar, Divider } from '@chakra-ui/react';
import { LikeButton, CommentButton } from '.';
import { ProfileLink, Row, Segment } from 'UI';

interface IProps {
  tweet: ITweet;
  user: IUser | null;
  hideAvatar?: boolean;
  width?: string | number;
}

const Tweet: React.FC<IProps> = ({
  tweet,
  user,
  hideAvatar = false,
  width
}) => {
  return (
    <Segment w={{ sm: 250, md: width ?? 'auto' }}>
      <Row justify='space-between'>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='md'
          textTransform='uppercase'
          ml='2'
        >
          <ProfileLink to={`/profile/${user?.username}`}>
            @{user?.username}
          </ProfileLink>
          <DateDisplay dateCreated={tweet.dateCreated} />
        </Box>

        {!hideAvatar && <Avatar src='https://bit.ly/broken-link' />}
      </Row>
      <Link to={`/tweet/${tweet._id}`}>
        <Box
          mt='1'
          ml='2'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          letterSpacing='wide'
          fontSize='md'
        >
          {tweet.message}
        </Box>
        <Divider orientation='horizontal' mt={2} mb={2} />
      </Link>
      <Row justify='space-between'>
        <LikeButton user={user} likes={tweet.likes} tweetId={tweet._id} />
        <CommentButton comments={tweet.comments ?? []} tweetId={tweet._id} />
      </Row>
    </Segment>
  );
};

export default Tweet;
