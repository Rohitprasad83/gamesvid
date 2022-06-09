import React, { useState, useEffect } from 'react'
import banner from 'assets/images/banner.jpg'
import { Navbar, Footer } from 'components'
import { HomePageCard } from './HomePageCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from 'features/categories/categoriesSlice'
import { Ring } from '@uiball/loaders'

export function Home() {
  const { categories, loading, error } = useSelector(state => state.categories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategories())
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
          {loading && <Ring size={128} speed={1} />}
          {error && (
            <h3>Could not fetch all categories, please refresh the page!</h3>
          )}

          {!loading &&
            categories.map(category => (
              <HomePageCard key={category.id} category={category} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
