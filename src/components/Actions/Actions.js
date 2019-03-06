import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';

const Actions = props => {
  const title = props.page === 'useractions' ? 'Mes actions' : 'Toutes les actions';
  return (
    <div className='actions'>
      <Header title={title} />
      <ActionsList {...props} />
    </div>
  );
};

export default Actions;
