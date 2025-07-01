import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCanArrowUp, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <div className="cart-item" key={item.id}>
    <img src={item.image} alt={item.name} />
    <div className="item-details">
      <h4>{item.name}</h4>
      <span>{item.color}</span>
    </div>
    <div className="quantity">
      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
    </div>
    <div className="price"><FontAwesomeIcon icon={faIndianRupeeSign} /> {(item.price * item.quantity).toFixed(2)}</div>
    <button className="remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name} from cart`}>
      <FontAwesomeIcon icon={faTrashCanArrowUp} style={{ color: '#ff0000' }} />
    </button>
  </div>
);

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate(); // ✅ Correct position
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.3;
  const total = subtotal - discount;
  const quantity=cartItems.length;
  const productname="Products"
  const handleBuyNow = () => {
    navigate('/Order/Checkout', {
      state: {
        cartItems,
        subtotal,
        discount,
        quantity,
        productname,
        total,
        

      }
    });
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-header">
          <h2>Cart ({cartItems.length} products)</h2>
          <button className="clear-btn" onClick={clearCart}>Clear cart</button>
        </div>

        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
            />
          ))}
        </div>

        <div className="promo-banner">
          <div>
            <h3>Check the Newest Apple Product</h3>
            <p>Official Apple retailer</p>
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>

      <div className="cart-right">
        <h3>Promo code</h3>
        <div className="promo-input">
          <input type="text" placeholder="Type here..." />
          <button>Apply</button>
        </div>

        <div className="summary">
          <div>
            <span>Subtotal</span>
            <span><FontAwesomeIcon icon={faIndianRupeeSign} /> {subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Discount</span>
            <span><FontAwesomeIcon icon={faIndianRupeeSign} /> {discount.toFixed(2)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span><FontAwesomeIcon icon={faIndianRupeeSign} /> {total.toFixed(2)}</span>
          </div>

          <button className="checkout" onClick={handleBuyNow}>
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
