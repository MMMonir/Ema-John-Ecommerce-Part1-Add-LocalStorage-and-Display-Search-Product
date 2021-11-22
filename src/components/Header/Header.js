import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    return (
        <div className="logo">
            <img src={logo} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order">Order Review</a>
                <a href="/review">Manage Inventory</a>
            </nav>
        </div>
    );
};

export default Header;