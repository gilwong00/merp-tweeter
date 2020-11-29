import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { useParams } from 'react-router-dom';
import { useToastNotification } from 'hooks';
import { GET_TWEET } from 'graphql/queries/tweet';
import { useQuery } from '@apollo/client';
import { SimpleGrid, Avatar, Heading } from '@chakra-ui/react';
import { IComment, Tweet } from '.';
import { Comment } from 'Comment';
import { Loading } from 'Loading';
import { Segment, Column } from 'UI';

const TweetDetails = () => {
  const { user } = useContext(AppContext);
  const { pushNotification } = useToastNotification();
  const { tweetId } = useParams<{ tweetId: string }>();
  const { loading, error, data } = useQuery(GET_TWEET, {
    variables: { tweetId }
  });

  if (error) {
    pushNotification('error', error.message);
    return (
      <Heading size='lg' textAlign='center'>
        Error getting tweet details
      </Heading>
    );
  }

  return (
    <Segment>
      {loading ? (
        <Loading />
      ) : (
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          alignItems={{ sm: 'flex-start', md: 'center' }}
          justifyItems={{ sm: 'flex-start', md: 'center' }}
        >
          <Avatar
            src='https://bit.ly/broken-link'
            size='xl'
            m={{ sm: 'auto', md: 0 }}
            mb={{ sm: 5 }}
          />
          <Column align={{ sm: 'flex-start', md: 'center' }}>
            <Tweet
              tweet={data.getTweet}
              user={user}
              hideAvatar={true}
              width={800}
            />

            <Column pt={5}>
              {data.getTweet.comments.map((comment: IComment) => {
                return (
                  <Comment key={comment._id} comment={comment} width={800} />
                );
              })}
            </Column>
          </Column>
        </SimpleGrid>
      )}
    </Segment>
  );
};

export default TweetDetails;
