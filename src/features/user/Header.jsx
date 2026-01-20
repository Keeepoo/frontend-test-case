function Header({ user }) {
  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {user ? `Привет, ${user.name}!` : 'Загрузка...'}
      </div>
    </header>
  )
}

export default Header

