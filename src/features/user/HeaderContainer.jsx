import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/store'

export default function HeaderContainer() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.app.user)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setUser({ id: 1, name: 'Иван Иванов', email: 'ivan@example.com' }))
    }, 500)
  }, [dispatch])

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {user ? <span>Привет, {user.name}!</span> : 'Загрузка пользователя...'}
      </div>
    </header>
  )
}
