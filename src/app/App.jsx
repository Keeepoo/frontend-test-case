import React from 'react'
import HeaderContainer from '../features/user/HeaderContainer'
import ProductsContainer from '../features/ProductsContainer'
import CartContainer from '../features/cart/CartContainer'

function App() {
  return (
    <div className="app">
      <HeaderContainer />
      <div className="main-content">
        <ProductsContainer />
        <CartContainer />
      </div>
    </div>
  )
}

export default App