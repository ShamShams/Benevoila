import React, { Component } from 'react';
import axios from 'axios';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Routes from './routes';

class App extends Component {
  state = { user: null };

  componentDidMount = async () => {
    await this.authenticate();
  };

  authenticate = async () => {
    const token = localStorage.getItem('token');
    let authenticated = null;
    try {
      authenticated = await axios.post('http://localhost:3000/authenticate', { token });
      this.setState({ user: authenticated.data.user });
    } catch (error) {
      this.setState({ user: false });
      console.log(error);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Routes user={user} authenticate={this.authenticate} />
      </MuiThemeProvider>
    );
  }
}

export default App;
