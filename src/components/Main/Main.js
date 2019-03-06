import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Actions from '../Actions';
import SideBar from '../SideBar';

const Main = props => (
  <div>
    <SideBar {...props} />
    <Switch>
      <Route path='/' exact render={() => <Actions page='allActions' {...props} />} />
      <Route path='/mes-actions' render={() => <Actions page='useractions' {...props} />} />
      <Route path='/profil' render={() => <h1>Profil</h1>} {...props} />
    </Switch>
  </div>
);

export default Main;
