import React, { Component } from 'react';
import axios from 'axios';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

class UserCard extends Component {
  state = { registrations: [] };

  componentDidMount = async () => {
    await this.getUserActions();
  };

  getUserActions = async () => {
    const { user } = this.props;

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let userRegistrations = null;
    try {
      userRegistrations = await axios.get(
        `http://localhost:3000/registrations/user/${user.user_id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
    this.setState({ registrations: userRegistrations.data });
  };

  render() {
    const { user } = this.props;
    const { registrations } = this.state;
    const { firstname, lastname, role, phone, email } = user;

    const registrationsNumber = registrations && registrations.length;

    return (
      <div className='user-card'>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <div className='user-card-summary'>
              <div className='user-card-name'>
                {firstname} {lastname}
              </div>
              <div className='user-card-info'>
                <div className='user-card-role'>{role}</div>
                {role === 'bénévole' && (
                  <div className='user-card-registrations'>
                    Nombre d'inscriptions :{' '}
                    <span className={registrationsNumber ? 'reg-number' : 'no-reg'}>
                      {registrationsNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='user-card-details'>
              <div className='user-card-details-item'>
                <span>Téléphone : </span> {phone}
              </div>
              <div className='user-card-details-item'>
                <span>Email : </span> {email}
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default UserCard;
