import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './theme';

import Main from './components/Main';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/main' exact component={Main} />
            <Route path='/register' component={Register} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
