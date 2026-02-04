function CartSummary({ totalPrice, onCheckout, disabled }) {
  return (
    <div className="cart-footer">
      <div className="total">Итого: ${totalPrice}</div>
      <button className="checkout-btn" onClick={onCheckout} disabled={disabled}>
        {disabled?'Оформляем...':'Оформить заказ'}
      </button>
    </div>
  )
}

export default React.memo(CartSummary)

