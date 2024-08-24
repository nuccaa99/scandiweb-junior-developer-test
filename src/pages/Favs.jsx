import React, { useContext } from 'react';
import { FavContext } from '../context/Favs';
import Product from '../components/Product/Product';
import emptyBasket from '../assets/empty.jpg';

import { useLocation } from 'react-router-dom';

function Favs() {
  const { favItems } = useContext(FavContext);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fav_items_container">
      <h2 className='cart_items_title'>Favs</h2>
      <div className='fav_items_wrapper'>
        {favItems.length ? (
          favItems.map((item) => {
            return (
              <Product product={item} key={item.id} location={currentPath} />
            );
          })
        ) : (
          <div className="empty_cart">
            <img src={emptyBasket} alt="empty cart" className="empty_cart_img" />
            <p>You don't have any favourites</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favs;
