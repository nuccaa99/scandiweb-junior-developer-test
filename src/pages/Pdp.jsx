import React, { useEffect, useState } from 'react';
import { GET_PRODUCT_INFO } from '../Query';
import { useQuery } from '@apollo/client';

import { useCurrency } from '../context/CurrencyContext';

import { useParams } from 'react-router-dom';

import { ColorRing } from 'react-loader-spinner';

function Pdp() {
  const { currCurrency } = useCurrency();

  const [spotlightImg, setSpotlightImg] = useState('');

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_INFO, {
    variables: { productId: id },
  });

  useEffect(() => {
    if (data && data.product) {
      setSpotlightImg(data.product.gallery[0]);
    }
  }, [data]);

  console.log(data);
  if (loading)
    return (
      <div className="loader_container">
        <ColorRing
          className="loader"
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <div className="product_page_container">
      <div className="product_images_list">
        {data.product.gallery.map((image) => {
          return (
            <img
              onClick={() => {
                setSpotlightImg(image);
              }}
              key={image}
              src={image}
              alt="product listings"
              className="product_images_list_item"
            />
          );
        })}
      </div>
      <img
        src={spotlightImg}
        alt="spotlight"
        className="product_spotlight_image"
      />
      <div className="product_info">
        <div className="product_section_wrapper">
          <p className="product_brand">{data.product.brand}</p>
          <p className="product_name">{data.product.name}</p>
        </div>
        {data.product.attributes.map((att) => {
          return (
            <div
              className="attributes_container product_section_wrapper"
              key={att.id}
            >
              <p className="attribute_name">{att.name}:</p>
              <div className="attributes_values">
                {att.items.map((item) => {
                  if (att.type !== 'swatch') {
                    return (
                      <button className="attribute" key={item.id}>
                        {item.value}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={item.id}
                        style={{ background: item.value }}
                        className="attribute swatch"
                      ></button>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
        <div className="product_section_wrapper">
          <p className="product_price_label">Price:</p>
          {data.product.prices.map((price) => {
            const { symbol } = price.currency;
            const { amount } = price;
            if (symbol === currCurrency) {
              return (
                <p className="product_price" key={`${symbol}-${amount}`}>
                  {symbol} {amount}
                </p>
              );
            }
            return null;
          })}
        </div>
        {data.product.inStock ? (
          <button className="btn product_page_add_to_cart">add to cart</button>
        ) : (
          <button className="btn product_page_add_to_cart out_of_stock">
            out of stock
          </button>
        )}
        <p
          className="product_description"
          dangerouslySetInnerHTML={{ __html: data.product.description }}
        ></p>
      </div>
    </div>
  );
}

export default Pdp;
