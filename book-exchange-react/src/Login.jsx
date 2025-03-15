import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsError(false)
          setMessage('Вы успешно авторизованы (демо).')
          setTimeout(() => navigate('/'), 1500)
        } else {
          setIsError(true)
          setMessage(data.error || 'Неверный email или пароль')
        }
      })
      .catch(() => {
        setIsError(true)
        setMessage('Ошибка при отправке запроса на сервер.')
      })
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Авторизация</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '640px' }}
      >
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
            pattern="^[A-Za-z0-9@._-]+$"
            title="Только латиница, цифры, символы @._-"
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
