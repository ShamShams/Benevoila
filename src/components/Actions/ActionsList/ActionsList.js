import React, { Component } from 'react';
import axios from 'axios';

import ActionCard from '../ActionCard';
import Loader from '../../Loader';

import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';

class ActionsList extends Component {
  state = {
    allActions: [],
    userActions: [],
    userRegistrations: [],
    isPastActions: false,
    isLoading: true,
    error: null,
  };

  componentDidMount = async () => {
    await this.getAllActions();
    await this.getUserActions();
  };

  getAllActions = async () => {
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
    // On récupère les inscriptions du user
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
    this.setState({ userRegistrations: userRegistrations.data });

    // On va chercher les actions auxquelles le user est inscrit
    const userActions = userRegistrations.data.map(reg => {
      return this.state.allActions.find(action => action.action_id === reg.action_id);
    });
    this.setState({ userActions });
  };

  handleRegister = async (action, isRegistered, registrationId) => {
    const { user } = this.props;

    const headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
    const data = { user_id: user.user_id, action_id: action.action_id };

    // Si le bénévole est déjà inscrit, l'action est supprimé de sa liste
    if (isRegistered) {
      let deletedRegistration = null;
      try {
        deletedRegistration = await axios.delete(
          `http://localhost:3000/registrations/delete/${registrationId}`,
          headers
        );
      } catch (error) {
        console.log(error);
      }
      console.log(deletedRegistration.data.msg);
      this.getUserActions();

      // sinon l'action est ajoutée
    } else {
      let registration = null;
      try {
        registration = await axios.post(
          'http://localhost:3000/registrations/create',
          data,
          headers
        );
      } catch (error) {
        console.log(error);
      }
      console.log(registration.data.msg);
      this.getUserActions();
    }
  };

  deleteAction = async action => {
    const headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
    let deletedRegistration = null;
    try {
      deletedRegistration = await axios.delete(
        `http://localhost:3000/actions/delete/${action.action_id}`,
        headers
      );
    } catch (error) {
      console.log(error);
    }
    console.log(deletedRegistration.data.msg);
    this.getAllActions();
  };

  togglePastActions = bool => {
    this.setState({ isPastActions: bool });
  };

  render() {
    const { allActions, userActions, isPastActions, isLoading, error } = this.state;
    const { page } = this.props;

    const noActionText =
      page === 'userActions'
        ? 'Vous n’êtes inscrit à aucune action'
        : 'Il n’y a aucune action proposée';

    const actionsList = page === 'userActions' ? userActions : allActions;
    const pastActions = actionsList.filter(action => new Date(action.end_date) < new Date());
    const actionsToCome = actionsList.filter(action => new Date(action.end_date) >= new Date());
    const actions = isPastActions ? pastActions : actionsToCome;

    if (isLoading) {
      return (
        <div className='loader'>
          <Loader />
        </div>
      );
    } else {
      return (
        <div className='action-list'>
          <div className='action-list-header'>
            {isPastActions ? (
              <Button onClick={() => this.togglePastActions(false)}>
                Voir les actions à venir
              </Button>
            ) : (
              <Button onClick={() => this.togglePastActions(true)}>Voir les actions passées</Button>
            )}
            <div className='action-list-header-right'>
              {page === 'admin' && (
                <Button onClick={() => this.props.history.push('/admin-creer-action')}>
                  <Add />
                  Créer
                </Button>
              )}
              <p className='action-list-total'>
                Total : <span>{actions.length}</span>
              </p>
            </div>
          </div>
          {error ? <p>{error.message}</p> : null}
          {!actions.length ? (
            <div className='no-action-text'>{noActionText}</div>
          ) : (
            actions
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .map(action => (
                <ActionCard
                  key={action.action_id}
                  action={action}
                  handleRegister={this.handleRegister}
                  deleteAction={this.deleteAction}
                  {...this.state}
                  {...this.props}
                />
              ))
          )}
        </div>
      );
    }
  }
}

export default ActionsList;
