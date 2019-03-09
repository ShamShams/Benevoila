import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../../Loader';
import UserCard from '../UserCard';

class UsersList extends Component {
  state = {
    users: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    await this.getAllUsers();
  };

  getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let users = null;
    try {
      users = await axios.get('http://localhost:3000/users', config);
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
    this.setState({ users: users.data, isLoading: false });
  };

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='loader'>
          <Loader />
        </div>
      );
    } else {
      return (
        <div className='users-list'>
          {users.map(user => (
            <UserCard key={user.user_id} user={user} />
          ))}
        </div>
      );
    }
  }
}

export default UsersList;
