import React from 'react';

import { NavLink } from 'react-router-dom';

import { Drawer, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import logoAcdlp from '../../assets/images/logo-acdlp.png';

import './SideBar.scss';

const styles = () => ({
    drawer: { width: '16rem' }
});

const SideBar = ({ classes }) => (
    <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
        <div className="sidebar">
            <div className="logo">
                <img src={logoAcdlp} alt="Logo Au coeur de la précarité" />
            </div>
            <Divider />
            <div className="navlinks">
                <li>
                    <NavLink to="/" className="link">
                        Toutes les actions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/useractions" className="link">
                        Mes actions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className="link">
                        Mon profil
                    </NavLink>
                </li>
            </div>
        </div>
    </Drawer>
);

export default withStyles(styles)(SideBar);
