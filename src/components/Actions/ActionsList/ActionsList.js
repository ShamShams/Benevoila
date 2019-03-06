import React, { Component } from 'react';
import axios from 'axios';

import ActionCard from '../ActionCard';
// import FullTabs from '../FullTabs';
import Loader from '../../Loader';

class ActionsList extends Component {
  state = {
    allActions: [],
    userActions: [],
    isLoading: true,
    error: null,
  };

  componentDidMount = async () => {
    await this.getActions();
    await this.getUserActions();
  };

  getActions = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-access-token': token } };
    let actions = null;
    try {
      actions = await axios.get('http://localhost:3000/actionsWithType', config);
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
    this.setState({ allActions: actions.data, isLoading: false });
  };

  getUserActions = async () => {
    const { user } = this.props;
    // Récupère les inscriptions du user
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
    // Va chercher les actions auxquelles le user est inscrit
    const userActions = userRegistrations.data.map(reg => {
      return this.state.allActions.find(action => action.action_id === reg.action_id);
    });
    this.setState({ userActions });
  };

  handleRegister = async action => {
    const { user } = this.props;

    const headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
    const data = { user_id: user.user_id, action_id: action.action_id };

    // Si le bénévole est déjà inscrit, l'action est supprimé de sa liste
    // if () {

    // sinon l'action est ajoutée
    // } else {
    let registration = null;
    try {
      registration = await axios.post('http://localhost:3000/registrations/create', data, headers);
    } catch (error) {
      console.log(error);
    }
    console.log(registration.data.msg);
    this.getUserActions();
    // }
  };

  render() {
    const { allActions, userActions, isLoading, error } = this.state;
    const { page, user } = this.props;

    const actionsList = page === 'useractions' ? userActions : allActions;

    return (
      <div className={isLoading ? 'loader' : 'action-list'}>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          actionsList
            .sort((a, b) => {
              return new Date(a.start_date) - new Date(b.start_date);
            })
            .map(action => {
              const isRegistered = userActions.some(
                userAction => action.action_id === userAction.action_id
              );
              return (
                <ActionCard
                  key={action.action_id}
                  action={action}
                  user={user}
                  isRegistered={isRegistered}
                  handleRegister={this.handleRegister}
                />
              );
            })
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default ActionsList;
