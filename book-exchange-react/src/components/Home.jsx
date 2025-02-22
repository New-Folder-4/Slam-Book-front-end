// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero-секция с кнопкой */}
      <div className="hero-section">
        <h2>Добро пожаловать в Book Exchange</h2>
        <p>Обмен книгами – современный способ дать книгам вторую жизнь.</p>
        <button onClick={() => navigate('/start-exchange')}>
          Начать обмен
        </button>
      </div>

      {/* Небольшая статистика для наглядности */}
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">1200+</span>
          <span className="stat-label">Активных обменов</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5000+</span>
          <span className="stat-label">Книг в системе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">4.8</span>
          <span className="stat-label">Средний рейтинг</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
