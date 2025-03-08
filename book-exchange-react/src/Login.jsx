import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

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
    <div className="login-page page-fade-in">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
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
        <button type="submit">Войти</button>
        {message && (
          <p className={isError ? 'error-message' : 'status-message'}>
            {message}
          </p>
        )}
        <p>
          <a href="#!" onClick={() => alert('Функция восстановления пароля (демо)')}>
            Забыли пароль?
          </a>
        </p>
        <p>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
      </form>
    </div>
  )
}

export default Login
