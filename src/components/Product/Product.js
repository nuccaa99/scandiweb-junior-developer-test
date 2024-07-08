import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

function Product({ product }) {
  const { currCurrency } = useCurrency();

  return (
    <div
      className={product.inStock ? 'product_card' : 'product_card out_of_stock'}
    >
      {!product.inStock && <p className='out_of_stock_txt'>OUT OF STOCK</p>}
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
    </div>
  );
}

export default Product;
