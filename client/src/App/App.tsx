import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER, WHO_AM_I } from 'graphql/queries/user';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';
import { Notification } from 'Notification';
import { Navbar } from 'Navbar';
import { cache } from 'Apollo';

const App = () => {
  const { data, loading } = useQuery(GET_LOGGED_IN_USER);

  // initialize user state
  if (data?.getLoggedInUser) {
    cache.writeQuery({
      query: WHO_AM_I,
      data: {
        __typename: 'Query',
        user: data?.getLoggedInUser
      }
    });
  }

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <Router>
      <Container>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <ProtectedRoute exact path='/' component={Home} />
        </Switch>
        <Notification />
      </Container>
    </Router>
  );
};

export default App;
