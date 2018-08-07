import React from 'react';

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
                <img src={logoAcdlp} alt="Logo Au coeur de la précarité"/>
            </div>
            <Divider/>
            <div className="nav-links">
                <h4>Toutes les actions</h4>
                <h4>Mes actions</h4>
                <h4>Mon profil</h4>
            </div>
        </div>
    </Drawer>
);

export default withStyles(styles)(SideBar);
