import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Actions from '../Actions';
import SideBar from '../SideBar';

const Main = ({}) => (
  <div>
    <SideBar />
    <Switch>
      <Route path='/' exact render={() => <Actions page='allActions' />} />
      <Route path='/useractions' render={() => <Actions page='useractions' />} />
      <Route path='/profile' />
    </Switch>
  </div>
);

export default Main;
