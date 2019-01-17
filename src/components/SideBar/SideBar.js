import React from 'react';

import { NavLink } from 'react-router-dom';

import { Drawer, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import logoAcdlp from '../../assets/images/logo-acdlp.png';

const styles = () => ({
  drawer: { width: '16rem' },
});

const SideBar = ({ classes }) => (
  <Drawer variant='permanent' classes={{ paper: classes.drawer }}>
    <div className='sidebar'>
      <div className='logo'>
        <img src={logoAcdlp} alt='Logo Au coeur de la précarité' />
      </div>
      <Divider />
      <nav className='navlinks'>
        <li>
          <NavLink to='/main' className='link' exact>
            Toutes les actions
          </NavLink>
        </li>
        <li>
          <NavLink to='/main/useractions' className='link'>
            Mes actions
          </NavLink>
        </li>
        <li>
          <NavLink to='/main/profile' className='link'>
            Mon profil
          </NavLink>
        </li>
      </nav>
    </div>
  </Drawer>
);

export default withStyles(styles)(SideBar);
