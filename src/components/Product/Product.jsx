import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Product({ product }) {
  const { currCurrency } = useCurrency();

  return (
    <NavLink
      to={`/product/${product.id}`}
      className={product.inStock ? 'product_card' : 'product_card out_of_stock'}
    >
      {!product.inStock && <p className="out_of_stock_txt">OUT OF STOCK</p>}
      <FontAwesomeIcon icon={faCartShopping} className="add_to_cart" />
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
  );
}

export default Product;
