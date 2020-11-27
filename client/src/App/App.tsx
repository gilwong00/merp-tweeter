import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';
import { Navbar } from 'Navbar';
import { Loading } from 'Loading';
import { NewTweet } from 'Tweet';
import { AppContext } from 'Context';

const App = () => {
  const { loading } = useContext(AppContext);

  return (
    <Router>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Container maxW='xl' mt={5}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <ProtectedRoute exact path='/tweet/new' component={NewTweet} />
            <ProtectedRoute exact path='/' component={Home} />
          </Switch>
        </Container>
      )}
    </Router>
  );
};

export default App;
