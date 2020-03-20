import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';
import SideBar from '../SideBar';

import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const titles = {
  actions: 'Toutes les actions',
  userActions: 'Mes actions',
  admin: 'Les actions',
};

const Actions = props => {
  const title = titles[props.page];
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
        <Header title={title} />
        <ActionsList {...props} />
      </div>
    </div>
  );
};

export default Actions;
