import React, { Fragment } from 'react';

import { NavLink, withRouter } from 'react-router-dom';

import { Drawer, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        <div className='benevoila'>Bénévoilà</div>
        <div className='logo'>
          <NavLink to={`/actions`} className='link' exact>
            <img src='/src/assets/images/logo-acdlp.png' alt='Logo Au coeur de la précarité' />
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
          {user.role === 'admin' ? (
            <Fragment>
              <li>
                <NavLink to={`/admin-actions`} className='link' exact>
                  Les actions
                </NavLink>
              </li>
              <li>
                <NavLink to={`/admin-benevoles`} className='link'>
                  Les bénévoles
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
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
