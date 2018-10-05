import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Actions from '../Actions';
import SideBar from '../SideBar';

const Main = ({}) => (
    <div>
        <Router>
            <div>
                <SideBar />
                <Switch>
                    <Route
                        exact path="/"
                        render={() => <Actions page="allActions" />}
                    />
                    <Route
                        path="/useractions"
                        render={() => <Actions page="useractions" />}
                    />
                    <Route path="/profile"/>
                </Switch>
            </div>
        </Router>
    </div>
);

export default Main;
