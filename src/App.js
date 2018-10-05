import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './theme';
import Actions from './components/Actions';
import SideBar from './components/SideBar';


class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider>
        );
    }
}

export default App;
