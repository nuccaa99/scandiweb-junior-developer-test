import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/Cart';

function CartProduct({ product }) {

  const { currCurrency } = useCurrency();

  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="product_card_wrapper">
      <NavLink to={`/product/${product.id}`} className="product_card">
        <img
          src={product.gallery[0]}
          className="product_card_img"
          alt="product"
        />
        <p>
          {product.name} {product.brand}
        </p>
        {product.prices.map((price) => {
          const { symbol } = price.currency;
          const { amount } = price;
          if (symbol === currCurrency) {
            return (
              <p key={`${symbol}-${amount}`}>
                {symbol} {amount}
              </p>
            );
          }
          return null;
        })}
      </NavLink>
      <div className="cart_btn_wrapper">
        <FontAwesomeIcon
          icon={faMinus}
          className="delete_from_cart"
          onClick={() => {
            removeFromCart(product);
          }}
        />
      </div>
    </div>
  );
}

export default CartProduct;
