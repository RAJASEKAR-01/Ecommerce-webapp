import React from 'react';
import { Link } from 'react-router-dom';
import './Furniture.css';                          // ← same folder
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import SmartphonesDetails from '../../Data/product.js'; // adjust path if needed

/** ----------------------------------------------------------------
 *  Furniture (generic product‑grid) component
 *  Props:
 *    • category  – string ('all' to show everything)
 *    • offerss   – string (show items with this offer tag)
 *  ----------------------------------------------------------------*/
function Furniture({ category = 'all', offerss = '' }) {
  const products = SmartphonesDetails.filter(
    (p) =>
      category === 'all' ||
      p.category === category ||
      p.offer === offerss
  );

  return (
    <section className="grid">
      {products.map((phone) => (
        <article className="card" key={phone.id}>
          <Link
            to={`/product/${phone.id}`}
            state={{ phone }}
            className="card__link"
          >
            <img src={phone.image} alt={phone.name} className="card__img" />

            <div className="card__body">
              <h3 className="card__title">{phone.name}</h3>
              <p className="card__desc">
                {phone.description.slice(0, 60)}…
              </p>

              <div className="card__priceRow">
                <span className="card__offer">{phone.offer}</span>
                <span className="card__price">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />{' '}
                  {phone.price.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}

export default Furniture;
