import React, { Component } from 'react';

import ActionCard from '../ActionCard';

class ActionsList extends Component {
    render() {
        return (
            <div>
                <ActionCard />
                <ActionCard />    
            </div>
        );
    }
}

export default ActionsList;
