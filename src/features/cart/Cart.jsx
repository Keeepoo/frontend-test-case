import React from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

function Cart({ cart, totalPrice, onRemove, onUpdateQuantity, onCheckout, isOpen, toggleOpen }) {
  return (
    <div className="cart">
      <button className="cart-toggle" onClick={toggleOpen}>
        Корзина ({cart.reduce((sum,i)=>sum+i.quantity,0)})
      </button>
      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={toggleOpen}>×</button>
          </div>
          <div className="cart-items">
            {cart.length===0?<p>Корзина пуста</p>:cart.map(item=>(
              <CartItem key={item.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity}/>
            ))}
          </div>
          <CartSummary totalPrice={totalPrice} onCheckout={onCheckout} disabled={cart.length===0}/>
        </div>
      )}
    </div>
  )
}

export default React.memo(Cart)

