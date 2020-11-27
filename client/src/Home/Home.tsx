import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';
import { ITweet, Tweet } from 'Tweet';
import { SearchBar } from 'SearchBar';
import { AppContext } from 'Context';
import { useToastNotification } from 'hooks';
import { SimpleGrid, GridItem, Box, Button, Flex } from '@chakra-ui/react';

const Home = () => {
  const [offset, setOffset] = useState<number>(0);
  const { user } = useContext(AppContext);
  const { pushNotification } = useToastNotification();
  const { error, data, fetchMore } = useQuery(GET_ALL_TWEETS, {
    variables: { offset },
    notifyOnNetworkStatusChange: true
  });

  if (error) pushNotification('error', error.message);

  return (
    <Box
      borderWidth='1px'
      borderRadius='sm'
      overflow='hidden'
      p={5}
      minH={800}
      h='auto'
    >
      <SearchBar />
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacingX='40px' spacingY='20px'>
        {data?.tweets.map((tweet: ITweet) => (
          <GridItem key={tweet._id}>
            <Tweet tweet={tweet} user={user} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Flex justify='center' pt={60}>
        <Button
          colorScheme='teal'
          onClick={() => {
            fetchMore({
              variables: { offset: offset + 1 }
            });
            setOffset(current => (current += 1));
          }}
        >
          Load More
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
