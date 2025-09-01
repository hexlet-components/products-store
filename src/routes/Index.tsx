import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../pages/CartPage/CartPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import StorePage from '../pages/StorePage/StorePage'

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<StorePage />}
    />

    <Route
      path="/products/:id"
      element={<ProductPage />}
    />

    <Route
      path="/cart"
      element={<CartPage />}
    />
  </Routes>
)

export default AppRoutes
