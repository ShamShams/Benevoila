import React from 'react';

import { NavLink, withRouter } from 'react-router-dom';

import { Drawer, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import logoAcdlp from '../../assets/images/logo-acdlp.png';

const styles = () => ({
  drawer: { width: '16rem' },
});

const SideBar = ({ classes, user, authenticate }) => {
  const logOut = () => {
    localStorage.removeItem('token');
    authenticate();
  };

  return (
    <Drawer variant='permanent' classes={{ paper: classes.drawer }}>
      <div className='sidebar'>
        <div className='logo'>
          <NavLink to={`/actions`} className='link' exact>
            <img src={logoAcdlp} alt='Logo Au coeur de la précarité' />
          </NavLink>
        </div>
        <Divider />
        <div className='sidebar-user'>
          <p className='name'>
            {user.firstname} {user.lastname}
          </p>
          <p className='role'>{user.role}</p>
        </div>
        <Divider />
        <nav className='navlinks'>
          <li>
            <NavLink to={`/actions`} className='link' exact>
              Toutes les actions
            </NavLink>
          </li>
          <li>
            <NavLink to={`/mes-actions`} className='link'>
              Mes actions
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profil`} className='link'>
              Mon profil
            </NavLink>
          </li>
          <Divider />
          <div className='deconnexion'>
            <span className='link' onClick={logOut}>
              Déconnexion
            </span>
          </div>
        </nav>
      </div>
    </Drawer>
  );
};

export default withRouter(withStyles(styles)(SideBar));
