import React, { useState, useContext } from 'react';
import { Grid, Transition, Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';
import { ITweet, Tweet } from 'Tweet';
import { Loading } from 'Loading';
import { SearchBar } from 'SearchBar';
import { AppContext } from 'Context';
import styled from 'styled-components';

const GridContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 1000px;
  height: auto;
  // overflow-y: auto;
`;

const TweetFeedWrapper = styled(Grid.Row)`
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  padding: 0 !important;
`;

const Home = () => {
  const [offset, setOffset] = useState<number>(0);
  const { user, pushNotification } = useContext(AppContext);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_TWEETS, {
    variables: { offset },
    notifyOnNetworkStatusChange: true
  });

  if (error) pushNotification('error', error.message);

  if (loading) return <Loading />;

  return (
    <GridContainer columns={3}>
      <Grid.Row>
        <SearchBar />
      </Grid.Row>
      <TweetFeedWrapper>
        <Transition.Group>
          {data?.tweets.map((tweet: ITweet) => (
            <Grid.Column key={tweet._id} style={{ marginBottom: 20 }}>
              <Tweet tweet={tweet} user={user} />
            </Grid.Column>
          ))}
        </Transition.Group>
      </TweetFeedWrapper>
      <Button
        content='Load More'
        onClick={() => {
          fetchMore({
            variables: { offset: offset + 1 }
          });
          setOffset(current => (current += 1));
        }}
      />
    </GridContainer>
  );
};

export default Home;
