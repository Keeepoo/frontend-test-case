import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts, setLoading, addToCart } from '../store/store'

export default function ProductsContainer() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.app.products)
  const loading = useSelector(state => state.app.loading)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    dispatch(setLoading(true))
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: 'iPhone 14', price: 799, category: 'phones', image: 'https://via.placeholder.com/200', description: 'Новейший iPhone' },
        { id: 2, name: 'Samsung Galaxy S23', price: 699, category: 'phones', image: 'https://via.placeholder.com/200', description: 'Флагман Samsung' },
        { id: 3, name: 'MacBook Pro', price: 1999, category: 'laptops', image: 'https://via.placeholder.com/200', description: 'Мощный ноутбук Apple' },
        { id: 4, name: 'Dell XPS 13', price: 1299, category: 'laptops', image: 'https://via.placeholder.com/200', description: 'Премиум ноутбук Dell' },
        { id: 5, name: 'iPad Air', price: 599, category: 'tablets', image: 'https://via.placeholder.com/200', description: 'Планшет Apple' },
        { id: 6, name: 'Samsung Galaxy Tab', price: 399, category: 'tablets', image: 'https://via.placeholder.com/200', description: 'Планшет Samsung' }
      ]
      dispatch(setProducts(mockProducts))
      dispatch(setLoading(false))
    }, 1000)
  }, [dispatch])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || p.category === selectedCategory)
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  return (
    <div className="product-list">
      <div className="filters">
        <input type="text" placeholder="Поиск..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="all">Все категории</option>
          <option value="phones">Телефоны</option>
          <option value="laptops">Ноутбуки</option>
          <option value="tablets">Планшеты</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">По названию</option>
          <option value="price">По цене</option>
        </select>
      </div>

      {loading ? <div className="loading">Загрузка товаров...</div> :
        <div className="products">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="price">${p.price}</div>
              <button onClick={() => dispatch(addToCart(p))}>Добавить в корзину</button>
            </div>
          ))}
        </div>
      }
    </div>
  )
}



