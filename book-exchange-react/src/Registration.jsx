import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Registration({ setIsLoggedIn, setIsAdmin }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Регистрация'
  }, [])

  const onlyLetters = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /[A-Za-zА-Яа-яЁё\s-]/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

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

  const validateRegistrationFields = () => {
    if (
      !lastName.trim() ||
      !firstName.trim() ||
      !email.trim() ||
      !userName.trim() ||
      !password.trim()
    ) {
      return false
    }
    if (!email.includes('@')) return false
    if (password.length < 8) return false
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateRegistrationFields()) {
      setIsError(true)
      setMessage('Пожалуйста, заполните все обязательные поля корректно.')
      return
    }

    const payload = {
      firstName,
      lastName,
      secondName, 
      email,
      userName,   
      password
    }

    axios
      .post('http://localhost:1934/auth/register', payload)
      .then((response) => {
        // Если в ответе присутствует token, сохраняем его и создаем пустой адрес для пользователя
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token)
          const token = response.data.token
          // Отправляем POST запрос для создания пустого адреса
          axios.post('http://localhost:1934/user/addresses', {
            addrIndex: "",
            addrCity: "",
            addrStreet: "",
            addrHouse: "",
            addrStructure: "",
            addrApart: "",
            isDefault: true
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            console.log("Пустой адрес успешно создан")
          })
          .catch((error) => {
            console.error("Ошибка при создании пустого адреса:", error)
          })
        }
        setIsError(false)
        setMessage('Регистрация прошла успешно!')
        setIsLoggedIn(true)
        setIsAdmin(false)
        // Очистка полей после успешной регистрации
        setLastName('')
        setFirstName('')
        setSecondName('')
        setEmail('')
        setUsername('')
        setPassword('')
        setTimeout(() => {
          navigate('/profile')
        }, 1000)
      })
      .catch((error) => {
        setIsError(true)
        setMessage('Ошибка регистрации. Попробуйте ещё раз.')
        console.error(error)
      })
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
      >
        <div className="form-group">
          <label>Фамилия*:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Иванов"
            maxLength={50}
            pattern="^[A-Za-zА-Яа-яЁё\s\\-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Имя*:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Иван"
            maxLength={25}
            pattern="^[A-Za-zА-Яа-яЁё\s\\-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Отчество:</label>
          <input
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            placeholder="Отчество (необязательно)"
            maxLength={25}
            pattern="^[A-Za-zА-Яа-яЁё\s\\-]*$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Email*:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
            pattern="^[A-Za-z0-9@._\\-]+$"
            title="Только латиница, цифры, символы @._-"
            onKeyDown={onlyEmailChars}
          />
          <small>На этот адрес будет отправлено письмо для подтверждения</small>
        </div>
        <div className="form-group">
          <label>Ник (уникальный)*:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ваш ник"
            maxLength={20}
            pattern="^[A-Za-z0-9_]+$"
            title="Только латинские буквы, цифры и подчёркивания (до 20 символов)"
          />
        </div>
        <div className="form-group">
          <label>Пароль*:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Не менее 8 символов"
            pattern={passwordPattern}
            title="Пароль не должен содержать кириллицу"
          />
          <small>Пароль должен содержать хотя бы одну заглавную, одну прописную букву и цифру</small>
        </div>
        <div className="save-btn-container">
          <button type="submit">Зарегистрироваться</button>
        </div>
        {message && (
          <p className={isError ? 'error-message' : 'status-message'}>
            {message}
          </p>
        )}
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Уже зарегистрированы? <a href="/login">Войти</a>
        </p>
      </form>
    </div>
  )
}

export default Registration
