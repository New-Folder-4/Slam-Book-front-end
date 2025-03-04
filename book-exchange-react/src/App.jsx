// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home.jsx';
import StartExchange from './components/StartExchange.jsx';
import MyExchanges from './components/MyExchanges.jsx';
import Profile from './components/Profile.jsx';
import Feedback from './components/Feedback.jsx';
import Registration from './Registration.jsx';
import Login from './Login.jsx';

// Новый компонент админ-панели
import AdminPanel from './components/AdminPanel.jsx';

function App() {
  // Заглушка: для демонстрации укажем isAdmin = true
  // В реальном проекте вы можете получать эту информацию из авторизации/контекста
  const isAdmin = true;

  return (
    <div className="app-container">
      {/* Левая панель (desktop) / Горизонтальная (mobile) */}
      <aside className="side-menu">
        <div className="logo-block">
          <span className="logo">LOGO</span>
        </div>

        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/start-exchange">Начать обмен</Link></li>
            <li><Link to="/my-exchanges">Мои обмены</Link></li>
            <li><Link to="/profile">Личный кабинет</Link></li>
            <li><Link to="/feedback">Обратная связь</Link></li>
            {/* Отображаем пункт "Админ-панель" только если isAdmin=true */}
            {isAdmin && (
              <li><Link to="/admin">Админ-панель</Link></li>
            )}
          </ul>
        </nav>

        {/* Для ноутбуков/мониторов этот футер виден,
            а на телефоне (≤768px) будет скрыт CSS-медиазапросом */}
        <footer className="footer">
          <p>© 2025 Сервис обмена книгами</p>
        </footer>
      </aside>

      {/* Правая часть: контент */}
      <main className="main-content">
        <header className="top-header">
          <div className="user-block">
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            {/* Отдельный маршрут для админ-панели, доступен только если isAdmin=true */}
            {isAdmin && (
              <Route path="/admin" element={<AdminPanel />} />
            )}
          </Routes>
        </div>
      </main>

      {/* Мобильный подвал - только для телефонов (≤768px) */}
      <div className="mobile-footer">
        <p>© 2025 Сервис обмена книгами</p>
      </div>
    </div>
  );
}

export default App;
