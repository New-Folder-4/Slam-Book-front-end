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
import SupportChat from './components/SupportChat.jsx'
import EditAddress from './EditAddress.jsx'
import Notifications from './components/Notifications.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [headerAvatar, setHeaderAvatar] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setIsLoggedIn(true)
    }
    const storedIsAdmin = localStorage.getItem('isAdmin')
    if (storedIsAdmin === 'true') {
      setIsAdmin(true)
    }
    const storedAvatar = localStorage.getItem('selectedAvatar')
    if (storedAvatar) {
      setHeaderAvatar(storedAvatar)
    }
  }, [])

  // Если пользователь не залогинен, нет бокового меню => контент на всю ширину
  const mainContentStyle = isLoggedIn
    ? { marginLeft: '220px', width: 'calc(100% - 220px)' }
    : { marginLeft: '0', width: '100%' }

  return (
    <div className="app-container">
      {/* Боковое меню для Desktop */}
      {isLoggedIn && (
        <aside className="side-menu desktop-only">
          <nav>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/start-exchange">Начать обмен</Link></li>
              <li><Link to="/my-exchanges">Мои обмены</Link></li>
              <li><Link to="/profile">Личный кабинет</Link></li>
              <li><Link to="/feedback">Обратная связь</Link></li>
              <li><Link to="/notifications">Уведомления</Link></li>
              {isAdmin && (
                <>
                  <li><Link to="/admin">Админ-панель</Link></li>
                  <li><Link to="/support-chat/1">Чат поддержки</Link></li>
                </>
              )}
            </ul>
          </nav>
          <footer className="footer">
            <p>© 2025 Сервис обмена книгами</p>
          </footer>
        </aside>
      )}

      <main className="main-content" style={mainContentStyle}>
        {/* Верхняя шапка */}
        <header className="top-header">
          {/* Слева: логотип + (если не залогинен) ссылка "Главная" */}
          <div className="header-left-block">
            <img src="/images/logo.png" alt="Site Logo" className="site-logo" />
            {!isLoggedIn && (
              <Link to="/" style={{ color: '#ecf0f1' }}>Главная</Link>
            )}
          </div>

          {/* Меню-карусель для Mobile (скрыто на Desktop) */}
          {isLoggedIn && (
            <nav className="menu-carousel mobile-only">
              <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/start-exchange">Начать обмен</Link></li>
                <li><Link to="/my-exchanges">Мои обмены</Link></li>
                <li><Link to="/profile">Личный кабинет</Link></li>
                <li><Link to="/feedback">Обратная связь</Link></li>
                <li><Link to="/notifications">Уведомления</Link></li>
                {isAdmin && (
                  <>
                    <li><Link to="/admin">Админ-панель</Link></li>
                    <li><Link to="/support-chat/1">Чат поддержки</Link></li>
                  </>
                )}
              </ul>
            </nav>
          )}

          {/* Справа: аватарка / Авторизация / Регистрация */}
          <div className="user-block">
            {headerAvatar && (
              <img
                src={headerAvatar}
                alt="User Avatar"
                className="header-avatar"
              />
            )}
            {!isLoggedIn && (
              <span className="auth-links">
                <Link to="/login">Авторизация</Link> / 
                <Link to="/register">Регистрация</Link>
              </span>
            )}
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-exchange" element={<StartExchange />} />
            <Route path="/my-exchanges" element={<MyExchanges />} />
            <Route
              path="/profile"
              element={
                <Profile
                  onAvatarSelect={(src) => {
                    localStorage.setItem('selectedAvatar', src)
                    setHeaderAvatar(src)
                  }}
                  setIsLoggedIn={setIsLoggedIn}
                  setIsAdmin={setIsAdmin}
                  setHeaderAvatar={setHeaderAvatar}
                />
              }
            />
            <Route path="/profile/edit-address" element={<EditAddress />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="/register"
              element={
                <Registration
                  setIsLoggedIn={setIsLoggedIn}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setIsAdmin={setIsAdmin}
                />
              }
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/support-chat/:userId" element={<SupportChat />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
