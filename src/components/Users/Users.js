import React from 'react';

import Header from '../Header';
import SideBar from '../SideBar';
import UsersList from './UsersList';

const Users = props => {
  return (
    <div>
      <SideBar {...props} />
      <div className='actions'>
        <Header title='Les bénévoles' />
        <UsersList {...props} />
      </div>
    </div>
  );
};

export default Users;
