import React, { Component } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

// import Filter from '../Filter';
import ActionCard from '../ActionCard';
import Loader from '../Loader';

import axios from 'axios';

import './ActionsList.scss';

class ActionsList extends Component {
    state = {
        actions: [],
        actionType: '',
        isLoading: true,
        error: null
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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
        const { actions, actionType, isLoading, error } = this.state;
        return (
            <div className={isLoading ? 'loader' : 'action-list'}>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (
                    <div>
                        <form autoComplete="off">
                            <FormControl>
                                <InputLabel htmlFor="actionType">
                                    Type d'action
                                </InputLabel>
                                <Select
                                    value={this.state.actionType}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'actionType',
                                        id: 'actionType'
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {actions.map(action => (
                                        <MenuItem value={action.name}>
                                            {action.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                        {actions
                            .sort((a, b) => {
                                return (
                                    new Date(a.start_date) -
                                    new Date(b.start_date)
                                );
                            })
                            .map(action => (
                                <ActionCard
                                    key={action.action_id}
                                    action={action}
                                />
                            ))}
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        );
    }
}

export default ActionsList;
