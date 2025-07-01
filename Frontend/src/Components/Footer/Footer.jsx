import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>E Commerce</h3>
          <p>Your trusted platform to buy and sell pre-loved items with ease and confidence.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Shop</a></li>
            <li><a href="/Cart">Cart</a></li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </div>

        <div className="footer-section help">
          <h4>Customer Service</h4>
          <ul>
            <li><>FAQs</></li>
            <li>Return Policy</li>
            <li>Shipping Info</li>
            <li>Support</li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

