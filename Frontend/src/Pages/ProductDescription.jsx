import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SmartphonesDetails from '../Data/product.js';
import './ProductDescription.css';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import 'animate.css';

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const phone = SmartphonesDetails.find((item) => item.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(phone ? phone.colorOptions[0] : '');
  const { addToCart } = useCart();

  if (!phone) return <div>Product not found.</div>;

  const handleColorClick = (color) => setSelectedColor(color);

  const handleAddToCart = () => {
    const productToAdd = {
      id: phone.id,
      name: phone.name,
      price: phone.discountedPrice,
      color: selectedColor,
      image: phone.image,
      count: 1,
    };

    addToCart(productToAdd);

    Swal.fire({
      title: 'Added to Cart!',
      text: `${phone.name} (${selectedColor}) added successfully.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  };

  const handleBuyNow = () => {
    navigate('/Order/Checkout', {
      state: {
        productName: phone.name,
        price: phone.price,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="pd-container">
      <button className="pd-back" onClick={handleBack} aria-label="Go back">
        &#8592;
      </button>

      <div className="pd-layout">
        <div className="pd-image">
          <img src={phone.image} alt={phone.name} />
        </div>

        <div className="pd-details">
          <h1>{phone.name}</h1>
          <p className="pd-offer">{phone.offer}</p>
          <p>Price: ₹{phone.price}</p>
          <p>Discounted Price: ₹{phone.discountedPrice}</p>
          <p>SKU: {phone.sku}</p>
          <p>Dimensions: {phone.dimensions}</p>
          <p>Weight: {phone.weight}</p>
          <p>Warranty: {phone.warranty}</p>

          <div className="pd-colors">
            <h3>Available Colors:</h3>
            <ul className="pd-color-list">
              {phone.colorOptions.map((color, index) => (
                <li
                  key={index}
                  className={`pd-color-item ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => handleColorClick(color)}
                >
                  {color}
                </li>
              ))}
            </ul>
          </div>

          <div className="pd-features">
            <h3>Features:</h3>
            <ul>
              {phone.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="pd-buttons">
            <button className="btn buy-btn" onClick={handleBuyNow}>Buy Now</button>
            <button className="btn cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
