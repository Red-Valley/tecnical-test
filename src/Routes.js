import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Profile from './components/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Chat} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);

export default Routes;
