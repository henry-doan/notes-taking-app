import React from 'react';
import Home from './components/shared/Home';
import NoMatch from './components/shared/NoMatch';
import { Switch, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react";

const App = () => (
  <>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </>
)

export default App;