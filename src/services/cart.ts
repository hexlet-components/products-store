import { CartT } from '../types/cart'

export const updateCartSessionStorage = (cart: CartT) => {
  sessionStorage.removeItem('cart')

  try {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }
  catch (error) {
    console.error(error)
  }
}

export const getCartFromSessionStorage = () => {
  const cart = sessionStorage.getItem('cart')

  try {
    return cart ? JSON.parse(cart) : {}
  }
  catch (error) {
    console.error(error)
  }
}
