import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
  error: null,
  cartCount: 0,
  totalPrice: 0
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts: (state, action) => { state.products = action.payload },
    setUser: (state, action) => { state.user = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.cart.find(item => item.id === product.id)
      if (existing) existing.quantity += 1
      else state.cart.push({ ...product, quantity: 1 })

      state.cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload)
      state.cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cart.find(i => i.id === id)
      if (item) item.quantity = quantity
      state.cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    clearCart: (state) => {
      state.cart = []
      state.cartCount = 0
      state.totalPrice = 0
    }
  }
})

export const { setProducts, setUser, setLoading, addToCart, removeFromCart, updateQuantity, clearCart } = appSlice.actions

export const store = configureStore({
  reducer: { app: appSlice.reducer }
})
