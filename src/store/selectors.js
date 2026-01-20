import { createSelector } from '@reduxjs/toolkit'

export const selectProducts = (state) => state.app.products
export const selectCart = (state) => state.app.cart
export const selectUser = (state) => state.app.user
export const selectLoading = (state) => state.app.loading
export const selectError = (state) => state.app.error

export const selectCartCount = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, i) => total + i.quantity, 0)
)

export const selectTotalPrice = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, i) => total + i.price * i.quantity, 0)
)

