import React, { useContext } from 'react';
import { CartContext } from '../context/Cart';
import CartProduct from '../components/CartProduct/CartProduct';
import emptyBasket from '../assets/empty.jpg';

function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart_items_container">
      <h2 className='cart_items_title'>Cart</h2>
      {cartItems.length ? (
        cartItems.map((item) => {
          return <CartProduct product={item} key={item.id} />;
        })
      ) : (
        <div className="empty_cart">
          <img src={emptyBasket} alt="empty cart" className="empty_cart_img" />
          <p className="empty_cart title">Empty Basket</p>
          <p>
            Your basket is still empty, discover everything we've got for you
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
