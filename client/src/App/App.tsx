import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Home } from 'Home';
import { Register, Login } from 'Auth';
// import './App.css';

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
