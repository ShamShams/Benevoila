import React, { Component } from 'react';

import Header from '../Header';
import ActionsList from '../ActionsList';

import './Main.scss';

class Main extends Component {

    render() {
        return (
            <div className="main">
                <Header title="Toutes les actions"></Header>
                <ActionsList />
            </div>
        );
    }

}

export default Main;
