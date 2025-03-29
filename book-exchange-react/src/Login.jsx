import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ setIsLoggedIn, setIsAdmin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Авторизация'
  }, [])

  const onlyUsernameChars = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /[A-Za-z0-9_]/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

  const passwordPattern = '^[^а-яА-ЯёЁ]*$'

  const handleSubmit = (e) => {
    e.preventDefault()

    // Подготовка payload: используем значение username как email для API
    const payload = {
      email: username,
      password
    }

    axios
      .post('/auth/login', payload)
      .then((response) => {
        setIsError(false)
        setMessage('Вы успешно авторизованы.')
        // Допустим, в ответе приходит токен, который можно сохранить (например, response.data.token)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        }
        // Сохраняем данные в localStorage для сохранения функционала
        localStorage.setItem('username', username)
        // Если админ, можно установить специальное значение (API может вернуть информацию о роли)
        if (username === 'admin') {
          localStorage.setItem('isAdmin', 'true')
          setIsAdmin(true)
        } else {
          localStorage.setItem('isAdmin', 'false')
          setIsAdmin(false)
        }
        setIsLoggedIn(true)
        setTimeout(() => navigate('/profile'), 1000)
      })
      .catch((error) => {
        setIsError(true)
        setMessage('Неверный ник или пароль')
        console.error(error)
      })
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Авторизация</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
      >
        <div className="form-group">
          <label>Ник:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ваш ник"
            pattern="^[A-Za-z0-9_]+$"
            title="Только латинские буквы, цифры и подчёркивания"
            onKeyDown={onlyUsernameChars}
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
