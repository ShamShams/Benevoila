import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';
import SideBar from '../SideBar';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const titles = {
  actions: 'Toutes les actions',
  userActions: 'Mes actions',
  admin: 'Les actions',
};

const styles = theme => ({
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

const Actions = props => {
  const title = titles[props.page];
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
        <Header title={title} />
        <ActionsList {...props} />
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Actions);
