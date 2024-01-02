import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context'
import './styles.css'

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState()
  return (
    <div className='products'>
      <Card>
        <Card.Img
          variant='top'
          src={prod.image}
          alt={prod.name}
        />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>Description: {prod.description}</span>
            <div>Price:${prod.price}</div>

            <Rating rating={prod.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod,
                })
              }}
              variant='danger'
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: prod,
                })
              }}
              disabled={!prod.inStock}
            >
              {!prod.inStock ? 'Out of Stock' : 'Add To Cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct
