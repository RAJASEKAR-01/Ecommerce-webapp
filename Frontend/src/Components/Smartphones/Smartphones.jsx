import React from 'react';
import './Smartphone.css';
import { Link } from 'react-router-dom';
import SmartphonesDetails from '../../Data/product';

function Smartphones() {
  const smartphoneList = SmartphonesDetails.filter(product => product.category === 'Smartphones').slice(0,6);

  return (
    <div className="mobile-deals-section">
      <h2 className="section-title">Top Deals on Mobile Phone</h2>
      <div className="Mobile-sec">
        {smartphoneList.map((phone) => (
          <div className="Mobile-box" key={phone.id}>
            <Link to={`/product/${phone.id}`} state={{ phone }}>
              <img src={phone.image} alt={phone.name} />
            </Link>
            <div className="content">
              <p className="phone-name">{phone.name}</p>
              <p className="phone-offer">{phone.offer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Smartphones;
