import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Loader from './components/Loader';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={Main} {...this.props} />
          <PublicRoute path='/inscription' component={Register} {...this.props} />
          <PublicRoute path='/connexion' component={Login} {...this.props} />
        </Switch>
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, user, authenticate }) {
  return (
    <Route
      render={props => {
        if (user) {
          return <Component authenticate={authenticate} {...props} />;
        } else if (user === false) {
          return (
            <Redirect
              to={{
                pathname: '/connexion',
                state: { from: props.location },
                // props.location est la page sur laquelle l'utilisateur veut aller
                // Il sera redirigé dessus une fois connecté
              }}
            />
          );
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
          return <Redirect to='/' />;
        } else {
          return <Loader />;
        }
      }}
    />
  );
}

export default Routes;
