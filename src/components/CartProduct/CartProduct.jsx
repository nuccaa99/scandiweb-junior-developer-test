import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/Cart';
import { FavContext } from '../../context/Favs';


function CartProduct({ product }) {
  const { currCurrency } = useCurrency();

  const { removeFromCart } = useContext(CartContext);

  const { addToFav, isFav, removeFromFav } = useContext(FavContext)

  const handleNavLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const toggleFav = () => {
    if (isFav(product.id)) {
      removeFromFav(product);
    } else {
      addToFav(product);
    }
  };

  return (
    <div className="cart_product_card_wrapper">
      <div className="cart_product_card_btn_wrapper">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="cart_product_card_edit"
        />
        <FontAwesomeIcon
          icon={faMinus}
          className="cart_product_card_delete"
          onClick={() => removeFromCart(product)} />
        <FontAwesomeIcon
          icon={isFav(product.id) ? faHeartSolid : faHeartRegular}
          className="cart_product_card_add_to_favs"
          onClick={toggleFav}
        />

      </div>
      <NavLink to={`/product/${product.id}`} className="cart_product_card">
        <div className="cart_product_card_content">
          <p className="product_card_brand">{product.brand}</p>
          <p className="product_card_name">{product.name}</p>
          {product.prices.map((price) => {
            const { symbol } = price.currency;
            const { amount } = price;
            if (symbol === currCurrency) {
              return (
                <p key={`${symbol}-${amount}`} className="product_card_price">
                  {symbol} {amount}
                </p>
              );
            }
            return null;
          })}
          <p className="attribute_name cart">quantity: {product.quantity}</p>

          {product.attributes.map((att) => {
            return (
              <div
                onClick={handleNavLinkClick}
                className="attributes_container product_section_wrapper"
                key={att.id}
              >
                <p className="attribute_name cart">{att.name}:</p>
                <div className="attributes_values">
                  {att.items.map((item) => {
                    if (att.type !== 'swatch') {
                      return (
                        <button
                          className={`attribute ${product.selectedAttributes[att.id] === item.id
                            ? 'selected'
                            : ''
                            }`}
                          key={item.id}
                        >
                          {item.value}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className={`attribute swatch ${product.selectedAttributes[att.id] === item.id
                            ? 'selected'
                            : ''
                            }`}
                          style={{ background: item.value }}
                          key={item.id}
                        ></button>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <img
          src={product.gallery[0]}
          alt="product"
          className="cart_product_card_img"
        />
      </NavLink>
    </div>
  );
}

export default CartProduct;
