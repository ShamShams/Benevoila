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
                        <Route
                            path="/useractions"
                            render={() => <Main page="useractions" />}
                        />
                        <Route path="/profile" component={Main} />
                        <Route
                            path="/"
                            render={() => <Main page="allActions" />}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
