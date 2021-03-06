import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Actions from './components/Actions';
import CreateAction from './components/Actions/CreateAction';
import EditAction from './components/Actions/EditAction';
import Loader from './components/Loader';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

class Routes extends Component {
  state = {
    mobileOpen: false,
  };

  toggleSideBar = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    return (
      <Router>
        <Switch>
          <AdminRoute
            path='/admin-actions'
            component={Actions}
            page='admin'
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <AdminRoute
            path='/admin-creer-action'
            component={CreateAction}
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <AdminRoute
            path='/admin-modifier-action'
            component={EditAction}
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <AdminRoute
            path='/admin-benevoles'
            component={Users}
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <PrivateRoute
            path='/actions'
            component={Actions}
            page='actions'
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <PrivateRoute
            path='/mes-actions'
            component={Actions}
            page='userActions'
            toggleSideBar={this.toggleSideBar}
            {...this.props}
            {...this.state}
          />
          <PublicRoute path='/inscription' component={Register} {...this.props} />
          <PublicRoute path='/connexion' component={Login} {...this.props} />
          <Redirect from='/' to='/actions' />
        </Switch>
      </Router>
    );
  }
}

function PrivateRoute({
  component: Component,
  user,
  authenticate,
  page,
  mobileOpen,
  toggleSideBar,
}) {
  return (
    <Route
      render={props => {
        if (user) {
          if (user.role === 'bénévole') {
            return (
              <Component
                authenticate={authenticate}
                user={user}
                page={page}
                mobileOpen={mobileOpen}
                toggleSideBar={toggleSideBar}
                {...props}
              />
            );
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

function AdminRoute({ component: Component, user, authenticate, page, mobileOpen, toggleSideBar }) {
  return (
    <Route
      render={props => {
        if (user) {
          if (user.role === 'admin') {
            return (
              <Component
                authenticate={authenticate}
                user={user}
                page={page}
                mobileOpen={mobileOpen}
                toggleSideBar={toggleSideBar}
                {...props}
              />
            );
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
