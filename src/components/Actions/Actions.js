import React from 'react';

import Header from '../Header';
import ActionsList from './ActionsList';

const Actions = ({ page }) => {
  const title = page === 'useractions' ? 'Mes actions' : 'Toutes les actions';
  return (
    <div className='actions'>
      <Header title={title} />
      <ActionsList page={page} />
    </div>
  );
};

export default Actions;
