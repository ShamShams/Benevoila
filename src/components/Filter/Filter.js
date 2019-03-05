import React, { Component } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  formControl: {
    marginRight: 10,
    minWidth: 200,
  },
});

class Filter extends Component {
  state = {
    actionType: '',
    city: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, actions } = this.props;
    return (
      <form autoComplete='off'>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='actionType'>Type d'action</InputLabel>
          <Select
            value={this.state.actionType}
            onChange={this.handleChange}
            inputProps={{
              name: 'actionType',
              id: 'actionType',
            }}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {actions.map(action => (
              <MenuItem value={action.name}>{action.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(Filter);
