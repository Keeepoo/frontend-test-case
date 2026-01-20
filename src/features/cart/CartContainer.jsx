import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../../store/store'

export default function CartContainer() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.app.cart)
  const totalPrice = useSelector(state => state.app.totalPrice)
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (id, qty) => {
    if (qty <= 0) dispatch(removeFromCart(id))
    else dispatch(updateQuantity({ id, quantity: qty }))
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      alert('Заказ оформлен!')
      dispatch(clearCart())
      setIsCheckingOut(false)
      setIsOpen(false)
    }, 1000)
  }

  return (
    <div className="cart">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cart.length})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? <p>Корзина пуста</p> :
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Удалить</button>
                </div>
              ))
            }
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="total">Итого: ${totalPrice}</div>
              <button className="checkout-btn" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Оформляем...' : 'Оформить заказ'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}





