import React, { Component } from 'react';

import ActionCard from '../ActionCard';

import './ActionsList.scss';

class ActionsList extends Component {
    render() {
        return (
            <div className="action-list">
                <ActionCard />
                <ActionCard />
            </div>
        );
    }
}

export default ActionsList;
