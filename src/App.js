import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './theme';

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/inscription' component={Register} />
            <Route path='/connexion' component={Login} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
