import React, { Component } from 'react';

import ActionCard from '../ActionCard';
import Loader from '../Loader';

import axios from 'axios';

import './ActionsList.scss';

class ActionsList extends Component {
    state = {
        allActions: [],
        userActions: [],
        isLoading: true,
        error: null
    };

    async getActions() {
        const response = await axios.get(
            'http://localhost:3000/actionsWithType'
        );
        try {
            this.setState({
                allActions: response.data,
                isLoading: false
            });
        } catch (error) {
            this.setState({ error, isLoading: false });
        }
    }

    componentDidMount() {
        this.getActions();
    }

    handleClick(action) {
        const { userActions } = this.state;
        const updatedUserActions = [...userActions, action];
        this.setState({
            userActions: updatedUserActions
        });
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
                            return (
                                new Date(a.start_date) - new Date(b.start_date)
                            );
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
