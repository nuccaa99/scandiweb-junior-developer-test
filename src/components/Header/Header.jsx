import React from 'react';

import logo from '../../assets/logo.png';
import cart from '../../assets/cart-logo.png';
import CurrencyDropdown from './CurrencyDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ categories }) {
  const navigate = useNavigate();

  return (
    <div className="header_container">
      <nav>
        <ul className="header_list">
          {categories.map((category) => (
            <NavLink
              activeclassname="active"
              to={`category/${category.name}`}
              className="header_list_item"
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </ul>
      </nav>
      <img
        className="logo_img"
        src={logo}
        alt="logo_img"
        onClick={() => navigate('/')}
      />
      <div className="currency_cart_wrapper">
        <CurrencyDropdown />
        <img src={cart} alt="cart-logo" />
      </div>
    </div>
  );
}

export default Header;
