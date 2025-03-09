import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import StartExchange from './components/StartExchange.jsx'
import MyExchanges from './components/MyExchanges.jsx'
import Profile from './components/Profile.jsx'
import Feedback from './components/Feedback.jsx'
import Registration from './Registration.jsx'
import Login from './Login.jsx'
import AdminPanel from './components/AdminPanel.jsx'

function App() {
  const isAdmin = true
  const [headerAvatar, setHeaderAvatar] = useState('')

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar')
    if (storedAvatar) {
      setHeaderAvatar(storedAvatar)
    }
  }, [])

  return (
    <div className="app-container">
      <aside className="side-menu">
        <div className="logo-block">
          <img src="/images/logo.png" alt="Site Logo" className="site-logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/start-exchange">Начать обмен</Link></li>
            <li><Link to="/my-exchanges">Мои обмены</Link></li>
            <li><Link to="/profile">Личный кабинет</Link></li>
            <li><Link to="/feedback">Обратная связь</Link></li>
            {isAdmin && (
              <li><Link to="/admin">Админ-панель</Link></li>
            )}
          </ul>
        </nav>
        <footer className="footer">
          <p>© 2025 Сервис обмена книгами</p>
        </footer>
      </aside>
      <main className="main-content">
        <header className="top-header">
          <div className="user-block">
            {headerAvatar && (
              <img src={headerAvatar} alt="User Avatar" className="header-avatar" />
            )}
            <span className="auth-links">
              <Link to="/login">Авторизация</Link> / 
              <Link to="/register"> Регистрация</Link>
            </span>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-exchange" element={<StartExchange />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route path="/profile" element={
              <Profile onAvatarSelect={(src) => {
                localStorage.setItem('selectedAvatar', src)
                setHeaderAvatar(src)
              }} />
            }/>
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            {isAdmin && (
              <Route path="/admin" element={<AdminPanel />} />
            )}
          </Routes>
        </div>
      </main>
      <div className="mobile-footer">
        <p>© 2025 Сервис обмена книгами</p>
      </div>
    </div>
  )
}

export default App
