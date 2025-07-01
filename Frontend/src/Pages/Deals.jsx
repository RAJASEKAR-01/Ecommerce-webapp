
import React from 'react'
import './Deals.css'
import Furniture from '../Components/Furniture/Furniture.jsx';
function Deals() {
  
  return (
    <div>
       <div className="deals-page">
      <div className="hero-banner">
        <h1>🔥 Mega Deals of the Day</h1>
        <p>Get up to 70% OFF on top products</p>
      </div>
      <Furniture category="all" offerss="70% off"/>

     
        
      </div>
    </div>
  
  )
}

export default Deals;

