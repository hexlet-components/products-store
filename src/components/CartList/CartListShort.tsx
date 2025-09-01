import React, { FC } from 'react'
import { ProductsT } from '../../types/product'
import { CartT } from '../../types/cart'
import { getPriceWithDiscount } from '../../utilities'

interface CartListProps {
  products: ProductsT
  cart: CartT
}

const listStyles = { border: '1px solid gray' }

const CartListShort: FC<CartListProps> = ({ products, cart }) => {
  const getPrice = (price: number, disacount: number, count: number) => (getPriceWithDiscount(price, disacount) * count)
    .toFixed(2)

  return (
    <ul className="ps-2 pe-2">
      {
        products.map(p => (
          <li
            key={p.id}
            className="mt-2 p-2 ps-4 pe-4 d-flex justify-content-between align-items-center"
            style={listStyles}
          >
            <h6
              className="me-3"
              style={{ marginBottom: '0' }}
            >
              {p.title}
            </h6>

            <span>
              {cart[p.id].quantity}
            </span>

            {getPrice(p.price, p.discountPercentage, cart[p.id].quantity)}
            $
          </li>
        ))
      }
    </ul>
  )
}

export default CartListShort
