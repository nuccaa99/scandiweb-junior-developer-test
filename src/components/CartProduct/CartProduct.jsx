import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/Cart';
import { FavContext } from '../../context/Favs';


function CartProduct({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing)

  const { currCurrency } = useCurrency();

  const { addToCart, removeFromCart } = useContext(CartContext);

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
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="cart_product_card_wrapper">
      <div className="cart_product_card_btn_wrapper">
        <FontAwesomeIcon
          icon={isEditing ? faCheck : faPenToSquare}
          className="cart_product_card_edit"
          onClick={handleEditClick}
        />
        <FontAwesomeIcon
          icon={faTrash}
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
          <div className='quantity_container' onClick={handleNavLinkClick}>
            <p className="attribute_name cart">quantity:</p>

            {isEditing ?
              <div className='quantity_wrapper'>
                <button className='q_descrease attribute' onClick={() => removeFromCart(product)}>-</button>
                <p className='quantity'>{product.quantity}</p>
                <button className='q_increase attribute' onClick={() => addToCart(product)}>+</button>

              </div>
              :
              <div className='quantity_wrapper'>
                <button className='q_increase attribute hidden'>+</button>
                <p className='quantity'>{product.quantity}</p>
                <button className='q_descrease attribute hidden'>-</button>
              </div>
            }
          </div>
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
      </NavLink >
    </div >
  );
}

export default CartProduct;
