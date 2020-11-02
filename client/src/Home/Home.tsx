import React from 'react';
import { Grid, Transition, Loader, Dimmer, Header } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TWEETS } from 'graphql/queries/tweet';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_TWEETS);

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <Header as='h1'>Tweets</Header>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
