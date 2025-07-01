import React from 'react';
import './Hero.css';
import ShopLogo from '../../Assets/store.png';

export const Hero = () => {
  return (
    <div className="Hero-section">
      <div className="Home-background">
      <div className="Hero-content">
        <h1>
          <span className="highlight">Discover Amazing Products!</span><br />
          Your one-stop shop for <span className="highlight">fashion, electronics</span>, and more.
        </h1>
        <h3>Enjoy great deals, fast delivery, and secure shopping every day.</h3>
        <button className="button-7">
          <img src={ShopLogo} alt="cart" className="icon" />
          Start Shopping
        </button>
        <p className="sub-text">Free shipping on orders above ₹499. No hidden charges!</p>
      </div>
      </div>
      
    </div>
  );
};
