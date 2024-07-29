import React, { useContext } from 'react';

import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import CurrencyDropdown from './CurrencyDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

import { FavContext } from '../../context/Favs';
import { CartContext } from '../../context/Cart';

function Header({ categories }) {
  const navigate = useNavigate();

  const { favItems } = useContext(FavContext);
  const { getCartCount } = useContext(CartContext);

  return (
    <header className="header_container">
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

        <NavLink className="carts_container" to={'/cart'}>
          <FontAwesomeIcon icon={faCartShopping} />
          {getCartCount() ? (
            <p className="count carts">{getCartCount()}</p>
          ) : null}
        </NavLink>
        <NavLink className="favs_container" to={'/favourites'}>
          <FontAwesomeIcon icon={faHeart} />
          {favItems.length ? (
            <p className="count favs">{favItems.length}</p>
          ) : null}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
