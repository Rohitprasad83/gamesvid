import React, { useState, useEffect } from 'react'
import banner from 'assets/images/banner.jpg'
import { Navbar, Footer } from 'components'
import axios from 'axios'
import { HomePageCard } from './HomePageCard'
export function Home() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    try {
      ;(async () => {
        const response = await axios.get('/api/categories')
        setCategories(response.data.categories)
      })()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <img
          src={banner}
          alt="banner"
          className="responsive__img center__image"
        />
        <h5 className="text-left home-banner">Categories</h5>
        <div className="cateogory-container">
          {categories.map(category => (
            <HomePageCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
