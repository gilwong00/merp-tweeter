import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'Context';
import { ITweet } from 'Tweet';
import { Box, Flex, Avatar, Divider } from '@chakra-ui/react';
import { LikeButton, CommentButton } from '.';
import { Row } from 'UI';

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
    date
  );
  const displayTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    date
  );

  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={5}>
      <Link to={`/tweet/${tweet._id}`}>
        <Row>
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
        </Row>

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
      </Link>
      <Divider orientation='horizontal' mt={2} mb={2} />
      <Row>
        <LikeButton user={user} likes={tweet.likes} tweetId={tweet._id} />
        <CommentButton comments={tweet.comments ?? []} tweetId={tweet._id} />
      </Row>
    </Box>
  );
};

export default Tweet;
