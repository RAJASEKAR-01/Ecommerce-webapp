import React from 'react';
import { Link } from 'react-router-dom';
import "../Furniture/Furniture.css";
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartphonesDetails from "../../Data/product.js";

function Furniture(props) {
  return (
    <div className='mobile-section'>
      {SmartphonesDetails.filter((c)=>c.offer === props.offerss || props.category === "all" || c.category === props.category).map((phone) => (
        <div className="mobile-card" key={phone.id}>
          <Link to={`/product/${phone.id}`} state={{ phone }}>
            <img src={phone.image} alt={phone.name} className="mobile-image" />
          </Link>
          <div className="mobile-content">
            <h3 className="mobile-name">{phone.name}</h3>
            <p className="mobile-description">{phone.description.slice(0, 60)}...</p>
            <div className="price-container">
              <span className="offer-tag">{phone.offer}</span>
              <span className="price">
                <FontAwesomeIcon icon={faIndianRupeeSign} /> {phone.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Furniture;
