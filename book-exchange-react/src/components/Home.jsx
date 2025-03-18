import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const thesesData = [
  {
    title: 'Удобный обмен',
    text: 'Быстрая форма для добавления книг в обмен, минимум полей и интуитивно понятные шаги.'
  },
  {
    title: 'Лёгкий старт',
    text: 'Быстрая регистрация и авторизация с понятной формой, занимающей не более пары минут.'
  },
  {
    title: 'Безопасность данных',
    text: 'Регистрация требует только базовой необходимой информации, ваши данные остаются в безопасности.'
  },
  {
    title: 'Персонализация',
    text: 'Возможность выбирать уникальный аватар или загружать собственный, делая профиль более индивидуальным.'
  },
  {
    title: 'Чёткая навигация',
    text: 'Все разделы сайта доступны в одном месте на удобной боковой панели, что позволяет легко ориентироваться даже новичку.'
  },
  {
    title: 'Минимализм и комфорт',
    text: 'Минималистичный интерфейс с успокаивающими оттенками, не перегружающий глаза пользователя.'
  },
  {
    title: 'Коммуникация с пользователями',
    text: 'Возможность отправлять сообщения администратору напрямую на сайте, не отвлекаясь на почту или сторонние мессенджеры.'
  },
]

function Home() {
  const navigate = useNavigate()
  const thesisRefs = useRef([])

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }
    const options = { threshold: 0.3 }
    const observer = new IntersectionObserver(callback, options)
    thesisRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-page page-fade-in">
      <div className="hero-section fade-in-bg">
        <h2 className="fade-in-text">Добро пожаловать в Book Changer</h2>
        <p className="fade-in-text-delay">
          Обмен книгами – современный способ дать книгам вторую жизнь.
        </p>
        <button
          className="fade-in-button"
          onClick={() => navigate('/start-exchange')}
        >
          Начать обмен
        </button>
      </div>
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
      <div className="theses-section" id="theses-section">
        {thesesData.map((thesis, index) => {
          const slideClass = index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'
          return (
            <div
              key={index}
              className={`thesis-block hidden ${slideClass}`}
              ref={(el) => (thesisRefs.current[index] = el)}
            >
              <h3 className="thesis-title">{thesis.title}</h3>
              <p className="thesis-text">{thesis.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
