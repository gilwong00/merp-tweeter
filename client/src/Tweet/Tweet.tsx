import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'Context';
import { ITweet } from 'Tweet';
import { Box, Flex, Avatar, Divider } from '@chakra-ui/react';
import { LikeButton, CommentButton } from '.';

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
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={5}>
      <Flex dir='row' justify='space-between'>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='md'
          textTransform='uppercase'
          ml='2'
        >
          @{user?.username}
          <div>
            {displayDate} at {displayTime}
          </div>
        </Box>

        <Avatar src='https://bit.ly/broken-link' />
      </Flex>
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
      {/* might be able to make this a generic row component */}
      <Flex dir='row' justify='space-between'>
        <LikeButton user={user} likes={tweet.likes} tweetId={tweet._id} />
        <CommentButton comments={tweet.comments ?? []} />
      </Flex>
    </Box>
  );
};

export default Tweet;
