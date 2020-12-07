import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Home } from 'Home';
import { Register, Login, ResetPassword } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';
import { Navbar } from 'Navbar';
import { Loading } from 'Loading';
import { NewTweet, TweetDetails } from 'Tweet';
import { Profile } from 'Profile';
import { AppContext } from 'Context';
import NotFound from '404';

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
            <Route path='/reset' component={ResetPassword} />
            <ProtectedRoute
              path={['/profile/:username', '/profile']}
              component={Profile}
            />
            <ProtectedRoute exact path='/tweet/new' component={NewTweet} />
            <ProtectedRoute path='/tweet/:tweetId' component={TweetDetails} />
            <ProtectedRoute exact path='/' component={Home} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
      )}
    </Router>
  );
};

export default App;
