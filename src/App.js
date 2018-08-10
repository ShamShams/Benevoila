import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import SideBar from './components/SideBar';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <SideBar />
                    <Switch>
                        <Route path="/actions" component={Main} />
                        <Route path="/useractions" component={Main} />
                        <Route path="/profile" component={Main} />
                        <Route path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
