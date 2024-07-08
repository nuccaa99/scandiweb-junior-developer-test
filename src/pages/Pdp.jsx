import React from 'react';
import { GET_PRODUCT_INFO } from '../Query';
import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';

function Pdp() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_INFO, {
    variables: { productId: id },
  });

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return <div>Pdp</div>;
}

export default Pdp;
