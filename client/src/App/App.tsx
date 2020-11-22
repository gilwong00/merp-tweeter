import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';
import { Notification } from 'Notification';
import { Navbar } from 'Navbar';
import { Loading } from 'Loading';
import { NewTweet } from 'Tweet';
import { AppContext } from 'Context';
import styled from 'styled-components';

const StyledSegment = styled(Segment)`
  height: auto;
  min-height: 1200px;
`;

const App = () => {
  const { loading } = useContext(AppContext);

  if (loading) return <Loading />;

  return (
    <Router>
      <Container>
        <StyledSegment>
          <Navbar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <ProtectedRoute exact path='/tweet/new' component={NewTweet} />
            <ProtectedRoute exact path='/' component={Home} />
          </Switch>
          <Notification />
        </StyledSegment>
      </Container>
    </Router>
  );
};

export default App;
