import React from 'react'
import './Card.css';
import Furniture from '../../Assets/Furniture.jpg';
import Fashion from '../../Assets/Fashion.jpg';
import Handbeg from '../../Assets/Handbag.jpg';
import Books from '../../Assets/Books.jpg';
import Tech from '../../Assets/Tech.jpg';
import Sneakers from '../../Assets/Sneakers.jpg';
import { Link } from 'react-router-dom';

const ProductDetails = [
  {
    id:1,
    name:"FURNITURE",
    img:Furniture
  },
  {
    id:2,
    name:"FASHION",
    img:Fashion
  },
  {
    id:3,
    name:"HAND BAG",
    img:Handbeg
  },
  {
    id:4,
    name:"Books",
    img:Books
  },
  {
    id:1,
    name:"Tech Gadges",
    img:Tech
  },
  {
    id:1,
    name:"Sneakers",
    img:Sneakers
  }
]

function Card() {
  return (
    

          
      <div className='categories-box'>
       {ProductDetails.map((item, key) => (
        <div key={key} className='img-box'>
          <Link to='/Categories'>
          <img src={item.img} alt={item.name} />
          <h3>{item.name}</h3>
          </Link>
        </div>
      ))}
    </div>
      

  )
}

export default Card