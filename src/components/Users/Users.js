import React from 'react';

import Header from '../Header';
import SideBar from '../SideBar';
import UsersList from './UsersList';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const Users = props => {
  const { toggleSideBar } = props;

  return (
    <div>
      <SideBar {...props} />
      <div className='actions'>
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          onClick={toggleSideBar}
          className='icon-button'>
          <Menu />
        </IconButton>
        <Header title='Les bénévoles' />
        <UsersList {...props} />
      </div>
    </div>
  );
};

export default Users;
