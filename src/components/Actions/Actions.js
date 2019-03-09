import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';
import SideBar from '../SideBar';

const titles = {
  actions: 'Toutes les actions',
  userActions: 'Mes actions',
  admin: 'Les actions',
};

const Actions = props => {
  const title = titles[props.page];

  return (
    <div>
      <SideBar {...props} />
      <div className='actions'>
        <Header title={title} />
        <ActionsList {...props} />
      </div>
    </div>
  );
};

export default Actions;
