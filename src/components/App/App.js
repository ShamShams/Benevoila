import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Main from '../Main';
import SideBar from '../SideBar';

class App extends Component {
    render() {
        return (
            <div>
                <SideBar />
                <Main />
            </div>
        );
    }
}

export default hot(module)(App);
