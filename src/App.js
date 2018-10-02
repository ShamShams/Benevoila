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
                            exact path="/"
                            render={() => <Main page="allActions" />}
                        />
                        <Route
                            path="/useractions"
                            render={() => <Main page="useractions" />}
                        />
                        <Route path="/profile" component={Main} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
