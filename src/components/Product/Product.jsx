import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import { FavContext } from '../../context/Favs';

function Product({ product, location }) {

  const { currCurrency } = useCurrency();
  const { addToFav, removeFromFav, isFav } = useContext(FavContext);


  const toggleFav = () => {
    if (isFav(product.id)) {
      removeFromFav(product);
    } else {
      addToFav(product);
    }
  };

  return (
    <div className="product_card_wrapper">
      <NavLink
        to={`/product/${product.id}`}
        className={
          product.inStock ? 'product_card' : 'product_card out_of_stock'
        }
      >
        {!product.inStock && <p className="out_of_stock_txt">OUT OF STOCK</p>}

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
      {location !== '/favourites' ? (
        <FontAwesomeIcon
          icon={faHeart}
          className={isFav(product.id) ? 'add_to_fav' : 'add_to_fav not_fav'}
          onClick={() => {
            toggleFav();
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faMinus}
          className="delete_from_fav"
          onClick={() => {
            toggleFav();
          }}
        />
      )}
    </div>
  );
}

export default Product;
