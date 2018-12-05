import React from 'react';

const Header = ({ title, children }) => (
    <div className="header">
        <h1 className="header-title">{title}</h1>
        { children }
    </div>
);

export default Header;
