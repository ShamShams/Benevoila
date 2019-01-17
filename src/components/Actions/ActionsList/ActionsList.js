import React, { Component } from 'react';

import ActionCard from '../ActionCard';
// import FullTabs from '../FullTabs';
import Loader from '../../Loader';

import axios from 'axios';

class ActionsList extends Component {
  state = {
    allActions: [],
    userActions: [],
    isLoading: true,
    error: null,
  };

  getActions() {
    axios
      .get('http://localhost:3000/actionsWithType')
      .then(res => {
        this.setState({ allActions: res.data, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  componentDidMount() {
    this.getActions();
  }

  handleClick(action) {
    const { userActions } = this.state;

    // Si le bénévole est déjà inscrit, l'action est supprimé de sa liste
    if (userActions.includes(action)) {
      const actionIndex = userActions.indexOf(action);
      const updatedUserActions = [...userActions.slice(0, actionIndex), ...userActions.slice(actionIndex + 1)];
      setTimeout(() => {
        this.setState({
          userActions: updatedUserActions,
        });
      }, 200);

      // sinon l'action est ajoutée
    } else {
      const updatedUserActions = [...userActions, action];
      setTimeout(() => {
        this.setState({
          userActions: updatedUserActions,
        });
      }, 200);
    }
  }

  render() {
    const { allActions, userActions, isLoading, error } = this.state;
    const { page } = this.props;

    const actionsList = page === 'useractions' ? userActions : allActions;

    return (
      <div className={isLoading ? 'loader' : 'action-list'}>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          actionsList
            .sort((a, b) => {
              return new Date(a.start_date) - new Date(b.start_date);
            })
            .map(action => (
              <ActionCard
                key={action.action_id}
                action={action}
                registered={userActions.includes(action)}
                handleClick={() => this.handleClick(action)}
              />
            ))
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default ActionsList;
