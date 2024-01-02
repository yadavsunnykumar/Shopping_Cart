import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import './styles.css'
import Filters from './Filters'

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byRating, searchQuery },
  } = CartState()

  const transformProducts = () => {
    let sortedProducts = products
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      )
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      )
    }
    return sortedProducts
  }

  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {transformProducts().map((prod) => {
          return (
            <SingleProduct
              prod={prod}
              key={prod._id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
