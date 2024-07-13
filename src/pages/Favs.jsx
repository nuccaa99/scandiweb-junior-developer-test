import React, { useContext } from 'react';
import { FavContext } from '../context/Favs';
import Product from '../components/Product/Product';

import { useLocation } from 'react-router-dom';

function Favs() {
  const { favItems } = useContext(FavContext);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fav_items_container">
      {favItems.map((item) => {
        return <Product product={item} key={item.id} location={currentPath} />;
      })}
    </div>
  );
}

export default Favs;
