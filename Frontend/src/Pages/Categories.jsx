import React, { useState } from 'react'
import './Categories.css'
import Furniture from '../Components/Furniture/Furniture'



function Categories() {
  const [Categorie,setcategorie]=useState("all");
  const CategoriesTypes=["all","Smartphones","Tablets","Laptops","Camera","Television","Audio","Fashion","Books","Tech Gadgets","Handbags"]

  return (
<>
<div className='cate-box'>
      <ul>
       {CategoriesTypes.map((product)=>
        (<li onClick={()=>setcategorie(product)}>{product}</li>)
       )}
      </ul>
    
    </div>
    <Furniture category={Categorie} />
</>
    
  )
}

export default Categories