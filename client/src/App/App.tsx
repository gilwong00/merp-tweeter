import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';
import { Notification } from 'Notification';
import { Navbar } from 'Navbar';
import { AppContext } from 'Context';
import styled from 'styled-components';

const StyledSegment = styled(Segment)`
  height: 800px;
`;

const App = () => {
  const { loading } = useContext(AppContext);

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
        <StyledSegment>
          <Navbar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <ProtectedRoute exact path='/' component={Home} />
          </Switch>
          <Notification />
        </StyledSegment>
      </Container>
    </Router>
  );
};

export default App;
