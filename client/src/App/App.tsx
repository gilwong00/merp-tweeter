import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
import { ProtectedRoute } from 'ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <ProtectedRoute exact path='/' component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
