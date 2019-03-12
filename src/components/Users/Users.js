import React from 'react';

import Header from '../Header';
import SideBar from '../SideBar';
import UsersList from './UsersList';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

const Users = props => {
  const { toggleSideBar, classes } = props;

  return (
    <div>
      <SideBar {...props} />
      <div className='actions'>
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          onClick={toggleSideBar}
          className={classes.menuButton}>
          <Menu />
        </IconButton>
        <Header title='Les bénévoles' />
        <UsersList {...props} />
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Users);
