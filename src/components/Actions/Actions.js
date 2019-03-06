import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';
import SideBar from '../SideBar';

const Actions = props => {
  const title = props.page === 'mes-actions' ? 'Mes actions' : 'Toutes les actions';

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
