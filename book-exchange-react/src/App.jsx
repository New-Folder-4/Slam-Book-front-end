// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import StartExchange from './components/StartExchange.jsx';
import MyExchanges from './components/MyExchanges.jsx';
import Profile from './components/Profile.jsx';
import Feedback from './components/Feedback.jsx';

function App() {
  return (
    <div className="app-container">
      {/* Левая боковая панель с меню */}
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
          </ul>
        </nav>
      </aside>

      {/* Правая часть: контент */}
      <main className="main-content">
        <header className="top-header">
          <div className="user-block">
            <span className="auth-links">
              <a href="#!" onClick={() => alert('Авторизация (демо)')}>Авторизация</a> / 
              <a href="#!" onClick={() => alert('Регистрация (демо)')}>Регистрация</a>
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
          </Routes>
        </div>

        <footer className="footer">
          <p>© 2025 Сервис обмена книгами</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
