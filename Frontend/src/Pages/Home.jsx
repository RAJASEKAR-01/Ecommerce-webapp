import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import Card from '../Components/Card/Card'
import Smartphones from '../Components/Smartphones/Smartphones'
import Banner from '../Components/Banner/Banner'

function Home() {
  return (
    <div>
      <Hero />
      <h2 className="section-title">Top Deals on Categories</h2>
      <Card />
      <Smartphones />
      <Banner />
    </div>
  )
}

export default Home