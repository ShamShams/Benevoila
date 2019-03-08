import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Actions from './components/Actions';
import Loader from './components/Loader';
import Login from './components/Login';
import Register from './components/Register';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AdminRoute path='/admin-actions' component={Actions} page='admin' {...this.props} />
          <PrivateRoute path='/actions' component={Actions} page='actions' {...this.props} />
          <PrivateRoute
            path='/mes-actions'
            component={Actions}
            page='userActions'
            {...this.props}
          />
          <PublicRoute path='/inscription' component={Register} {...this.props} />
          <PublicRoute path='/connexion' component={Login} {...this.props} />
          <Redirect from='/' to='/actions' />
        </Switch>
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, user, authenticate, page }) {
  return (
    <Route
      render={props => {
        if (user) {
          if (user.role === 'bénévole') {
            return <Component authenticate={authenticate} user={user} page={page} {...props} />;
          } else {
            return <Redirect to='/admin-actions' />;
          }
        } else if (user === false) {
          return <Redirect to='connexion' />;
        } else {
          return <Loader />;
        }
      }}
    />
  );
}

function AdminRoute({ component: Component, user, authenticate, page }) {
  return (
    <Route
      render={props => {
        if (user) {
          if (user.role === 'admin') {
            return <Component authenticate={authenticate} user={user} page={page} {...props} />;
          } else {
            return <Redirect to='/actions' />;
          }
        } else if (user === false) {
          return <Redirect to='/connexion' />;
        } else {
          return <Loader />;
        }
      }}
    />
  );
}

function PublicRoute({ component: Component, user, authenticate }) {
  return (
    <Route
      render={props => {
        if (user === false) {
          return <Component authenticate={authenticate} {...props} />;
        } else if (user) {
          return <Redirect to='/actions' />;
        } else {
          return <Loader />;
        }
      }}
    />
  );
}

export default Routes;
