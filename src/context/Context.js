import { createContext, useContext, useReducer } from 'react'
import products from './products'

import { cartReducer, productReducer } from './Reducers'

const Cart = createContext()
const Context = ({ children }) => {
  const product = products.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    inStock: product.countInStock,
    ratings: product.rating,
    description: product.description,
  }))
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: '',
  })

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(Cart)
}
