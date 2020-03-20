import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';

class FullTabs extends Component {
  state = {
    value: 0,
  };

  handleChange(event, value) {
    this.setState({ value });
  }

  handleChangeIndex(index) {
    this.setState({ value: index });
  }

  render() {
    return (
      <div>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth>
            <Tab label='Mes actions à venir' />
            <Tab label='Mes actions passées' />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default FullTabs;
