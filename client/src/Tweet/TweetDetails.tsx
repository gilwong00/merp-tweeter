import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_TWEET } from 'graphql/queries/tweet';
import { useQuery } from '@apollo/client';
import { SimpleGrid, Box, Flex, Avatar, Divider } from '@chakra-ui/react';

const TweetDetails = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  const { loading, error, data } = useQuery(GET_TWEET, {
    variables: { tweetId }
  });

  console.log('data', data);
  return (
    <Box
      borderWidth='1px'
      borderRadius='sm'
      overflow='hidden'
      p={5}
      minH={800}
      h='auto'
    >
      <Flex dir='column'></Flex>
    </Box>
  );
};

export default TweetDetails;
