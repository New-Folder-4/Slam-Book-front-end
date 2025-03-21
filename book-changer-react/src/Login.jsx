import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const regex = new RegExp(passwordPattern)
    if (!regex.test(password)) {
      setIsError(true)
      setMessage('Пароль содержит недопустимые символы (кириллица)')
      return
    }

    if (username.trim() === 'admin' && password === '12345678') {
      setIsError(false)
      setMessage('Вы успешно авторизованы как админ.')
      localStorage.setItem('username', 'admin')
      localStorage.setItem('isAdmin', 'true')
      setIsLoggedIn(true)
      setIsAdmin(true)
      setTimeout(() => navigate('/profile'), 1000)
    } else {
      if (password.length >= 8) {
        setIsError(false)
        setMessage('Вы успешно авторизованы.')
        localStorage.setItem('username', username)
        localStorage.setItem('isAdmin', 'false')
        setIsLoggedIn(true)
        setIsAdmin(false)
        setTimeout(() => navigate('/profile'), 1000)
      } else {
        setIsError(true)
        setMessage('Неверный ник или пароль')
      }
    }
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
