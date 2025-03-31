import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ setIsLoggedIn, setIsAdmin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Авторизация'
  }, [])

  // Функция разрешает ввод латинских букв, цифр, @, . , _ и -
  const onlyEmailChars = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /[A-Za-z0-9@._-]/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

  const passwordPattern = '^[^а-яА-ЯёЁ]*$'

  const handleSubmit = (e) => {
    e.preventDefault()

    // ИЗМЕНЕНИЕ ТОЛЬКО ЗДЕСЬ:
    const payload = {
      username: email, // Вместо { email, password } отправляем { username: email, password }
      password
    }

    axios
      .post('http://localhost:1934/auth/login', payload)
      .then((response) => {
        setIsError(false)
        setMessage('Вы успешно авторизованы.')
        // Обработка успешного входа
        if (email === 'admin@example.com') {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
        setIsLoggedIn(true)
        setTimeout(() => navigate('/profile'), 1000)
      })
      .catch((error) => {
        setIsError(true)
        setMessage('Неверный email или пароль')
        console.error(error)
      })
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            pattern="^[A-Za-z0-9@._\\-]+$"
            title="Введите корректный email (латиница, цифры, символы @, . , _ и \\-)"
            onKeyDown={onlyEmailChars}
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ваш пароль"
            pattern={passwordPattern}
            title="Пароль не должен содержать кириллицу"
          />
        </div>
        <div className="save-btn-container">
          <button type="submit">Войти</button>
        </div>
        {message && (
          <p className={isError ? 'error-message' : 'status-message'}>
            {message}
          </p>
        )}
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="#!" onClick={() => alert('Функция восстановления пароля (демо)')}>
            Забыли пароль?
          </a>
        </p>
        <p style={{ textAlign: 'center', marginTop: '5px' }}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
      </form>
    </div>
  )
}

export default Login