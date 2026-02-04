import React, { useMemo } from 'react'
import ProductCard from './ProductCard'

function ProductList({ products, onAddToCart }) {
  const rendered = useMemo(() => products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />), [products, onAddToCart])
  return <div className="products">{rendered}</div>
}

export default React.memo(ProductList)



