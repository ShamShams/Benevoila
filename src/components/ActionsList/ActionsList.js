import React, { Component } from 'react';

import ActionCard from '../ActionCard';
import Loader from '../Loader';

import axios from 'axios';

import './ActionsList.scss';

class ActionsList extends Component {
    state = {
        actions: [],
        isLoading: true,
        error: null
    };

    async getActions() {
        const response = await axios.get(
            'http://localhost:3000/actionsWithType'
        );
        try {
            this.setState({
                actions: response.data,
                isLoading: false
            });
        } catch (error) {
            this.setState({ error, isLoading: false });
        }
    }

    componentDidMount() {
        this.getActions();
    }

    render() {
        const { actions, isLoading, error } = this.state;
        return (
            <div className={isLoading ? 'loader' : 'action-list'}>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    actions
                        .sort((a, b) => {
                            return (
                                new Date(a.start_date) - new Date(b.start_date)
                            );
                        })
                        .map(action => (
                            <ActionCard
                                key={action.action_id}
                                action={action}
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
