import React from 'react';
import { GET_PRODUCTS } from '../Query';
import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';

import Product from '../components/Product/Product';

function Plp() {
  const { category } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="products_container">
      <h1 className="products_category_title">{category}</h1>
      <div className="products_cards_container">
        {data.category.products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Plp;
