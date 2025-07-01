import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";
import Logo from '../../Assets/Logo.png';
import CartLogo from '../../Assets/cart.png';
import ProfileLogo from '../../Assets/profile.png';
import FindLogo from '../../Assets/find.png';
import MicLogo from '../../Assets/microphone.png';
import Data from "../../Data/product.js";
import { useCart } from '../../context/CartContext.jsx';

export const Navbar = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [listening, setListening] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const filtered = Data.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSearchTerm(voiceText);
      handleSearch({ target: { value: voiceText } });
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event);
      setListening(false);
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/Login";
  };

  const renderSearchBar = () => (
    <div className='searchBar'>
      <input
        type="text"
        placeholder='Search Products'
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className='search-box'>
        <img src={MicLogo} alt='voice' title='click' className='icon' onClick={handleVoiceSearch} />
        <img src={FindLogo} alt="search" className='icon' />
      </div>

      {filteredProducts.length > 0 && (
        <ul className="dropdown">
          {filteredProducts.map(product => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`} onClick={() => setFilteredProducts([])} className="dropdown-link">
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <div className='NavBar'>
        <div className='logo-bar'>
          <img src={Logo} alt="logo" />
          <h3>Ecommerce</h3>
        </div>

        <div className={`MenuBar ${menuOpen ? "active" : ""}`}>
  <ul className='ul-len'>
    {storedUser && (
    <div className="mobile-user">
      <p>Hello, <strong>{storedUser.fullName}</strong></p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )}
    <li>
      <Link to="/" className='link' onClick={() => setMenuOpen(false)}>Home</Link>
      {currentPath === '/' && <hr />}
    </li>
    <li>
      <Link to="/Categories" className='link' onClick={() => setMenuOpen(false)}>Categories</Link>
      {currentPath === '/Categories' && <hr />}
    </li>
    <li>
      <Link to="/Deals" className='link' onClick={() => setMenuOpen(false)}>Deals/Offers</Link>
      {currentPath === '/Deals' && <hr />}
    </li>
  </ul>

  
</div>


        <div className='desktop-only'>
          {renderSearchBar()}
        </div>

        <div className='LoginBar'>
          {storedUser ? (
            <div className='mobile-user-info'>
              <span style={{ fontWeight: 'bold' }}>Hi, {storedUser.fullName?.split(" ")[0]}</span>
              <button onClick={handleLogout} style={{
                padding: '5px 10px',
                background: '#f44336',
                border: 'none',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/Login">
              <img src={ProfileLogo} alt="profile" className='icon' />
            </Link>
          )}
          <Link to="/Cart">
            <div>
              <img src={CartLogo} alt="cart" className='icon' />
              <div className="cartcount">{cartItems.length}</div>
            </div>
          </Link>
        </div>

        <div className='mobile-menu-icon' onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <div className="mobile-only">
        {renderSearchBar()}
      </div>
    </>
  );
};
