import React from 'react';
import { Link } from 'react-router-dom';
import './Furniture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import SmartphonesDetails from '../../Data/product.js';

function Furniture({ category = 'all', offerss = '' }) {
  const products = SmartphonesDetails.filter(
    (p) =>
      category === 'all' ||
      p.category === category ||
      p.offer === offerss
  );

  return (
    <section className="product-grid">
      {products.map((phone) => (
        <div className="product-card" key={phone.id}>
          <Link to={`/product/${phone.id}`} state={{ phone }} className="card-link">
            <div className="image-container">
              <img src={phone.image} alt={phone.name} />
            </div>
            <div className="product-info">
              <p className="sponsored">Sponsored</p>
              <p className="tag">#{phone.category}</p>
              <h3 className="product-name">{phone.name}</h3>
              <div className="price-row">
                <p className="discount">
                  <span className="cut">₹{phone.price}</span>{' '}
                  <strong>₹{phone.discountedPrice}</strong>{' '}
                  <span className="percent">({Math.round(((phone.price - phone.discountedPrice) / phone.price) * 100)}% off)</span>
                </p>
                <p className="wow-tag">WOW</p>
              </div>
              <p className="rating">
                ⭐ 4.3 <span className="green-badge">spoyl</span>
              </p>
              <p className="delivery">Delivery by 11 PM, Tomorrow</p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Furniture;
