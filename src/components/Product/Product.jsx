import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { FavContext } from '../../context/Favs';

function Product({ product, location }) {
  const [isFav, setIsFav] = useState(false);

  const { currCurrency } = useCurrency();
  const { addToFav, removeFromFav } = useContext(FavContext);

  useEffect(() => {
    const storedIsFav = localStorage.getItem(`product-${product.id}-isFav`);
    if (storedIsFav !== null) {
      setIsFav(JSON.parse(storedIsFav));
    }
  }, [product.id]);

  const toggleFav = () => {
    const newIsFav = !isFav;
    setIsFav(newIsFav);
    localStorage.setItem(
      `product-${product.id}-isFav`,
      JSON.stringify(newIsFav)
    );
    if (newIsFav) {
      addToFav({ ...product });
    } else {
      removeFromFav({ ...product });
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
          className={isFav ? 'add_to_fav' : 'add_to_fav not_fav'}
          onClick={() => {
            toggleFav();
          }}
        />
      ) : null}
    </div>
  );
}

export default Product;
