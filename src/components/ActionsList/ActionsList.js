import React, { Component } from 'react';

import ActionCard from '../ActionCard';

import axios from 'axios';

import './ActionsList.scss';

class ActionsList extends Component {
    state = {
        actions: [],
        isLoading: true,
        errors: null
    };

    async getActions() {
        const response = await axios.get('http://localhost:3000/actions');
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
        const { actions, isLoading } = this.state;
        return (
            <div className="action-list">
                {!isLoading ? (
                    actions.map(action => (
                        <ActionCard key={action.action_id} action={action} />
                    ))
                ) : (
                    <p>Chargement...</p>
                )}
            </div>
        );
    }
}

export default ActionsList;
