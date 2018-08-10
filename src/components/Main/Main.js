import React from 'react';

import Header from '../Header';
import ActionsList from '../ActionsList';

import './Main.scss';

const Main = ({ page }) => {
    const title = page === 'useractions' ? 'Mes actions' : 'Toutes les actions';
    return (
        <div className="main">
            <Header title={title} />
            <ActionsList page={page} />
        </div>
    );
};

export default Main;
