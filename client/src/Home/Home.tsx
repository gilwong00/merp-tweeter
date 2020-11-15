import React, { useContext } from 'react';
import { Grid, Transition, Header } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';
import { ITweet, Tweet } from 'Tweet';
import { Loading } from 'Loading';
import { AppContext } from 'Context';
import styled from 'styled-components';

const GridContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Home = () => {
  const { user, pushNotification } = useContext(AppContext);
  const { loading, error, data } = useQuery(GET_ALL_TWEETS, {
    variables: { offset: 0 }
  });

  if (error) pushNotification('error', error.message);

  return (
    <GridContainer columns={3}>
      <Grid.Row className='page-title'>
        {/* replace this with search component */}
        <Header as='h1'>Tweets</Header>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <Loading />
        ) : (
          <Transition.Group>
            {data.getAllTweets.map((tweet: ITweet) => (
              <Grid.Column key={tweet._id} style={{ marginBottom: 20 }}>
                <Tweet tweet={tweet} user={user} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </GridContainer>
  );
};

export default Home;
