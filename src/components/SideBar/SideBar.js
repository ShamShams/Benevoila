import React, { Fragment, Component } from 'react';

import { NavLink, withRouter } from 'react-router-dom';

import { Drawer, Divider, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = '16rem';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
});

class SideBar extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.authenticate();
  };

  render() {
    const { classes, theme, mobileOpen, toggleSideBar, user } = this.props;

    const drawer = (
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
            <span className='link' onClick={this.logOut}>
              Déconnexion
            </span>
          </div>
        </nav>
      </div>
    );

    return (
      <Fragment>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={toggleSideBar}
            classes={{ paper: classes.drawer }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawer,
            }}
            variant='permanent'
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(SideBar));
