import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Registration() {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [addrIndex, setAddrIndex] = useState('')
  const [addrCity, setAddrCity] = useState('')
  const [addrStreet, setAddrStreet] = useState('')
  const [addrHouse, setAddrHouse] = useState('')
  const [addrStructure, setAddrStructure] = useState('')
  const [addrApart, setAddrApart] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

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

  const onlyDigits = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /^[0-9]$/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

  const validateRegistrationFields = () => {
    if (
      !lastName.trim() ||
      !firstName.trim() ||
      !email.trim() ||
      !username.trim() ||
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

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lastName,
        firstName,
        secondName,
        email,
        username,
        password,
        addrIndex,
        addrCity,
        addrStreet,
        addrHouse,
        addrStructure,
        addrApart
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsError(false)
          setMessage('Регистрация прошла успешно! Проверьте e-mail для подтверждения.')
          setLastName('')
          setFirstName('')
          setSecondName('')
          setEmail('')
          setUsername('')
          setPassword('')
          setAddrIndex('')
          setAddrCity('')
          setAddrStreet('')
          setAddrHouse('')
          setAddrStructure('')
          setAddrApart('')
          setTimeout(() => navigate('/login'), 2000)
        } else {
          setIsError(true)
          setMessage(data.error || 'Ошибка при регистрации.')
        }
      })
      .catch(() => {
        setIsError(true)
        setMessage('Ошибка при отправке запроса на сервер.')
      })
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '640px' }}>
        <div className="form-group">
          <label>Фамилия*:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Иванов"
            maxLength={50}
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
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
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
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
            placeholder="Иванович"
            maxLength={25}
            pattern="^[A-Za-zА-Яа-яЁё\s-]*$"
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
            pattern="^[A-Za-z0-9@._-]+$"
            title="Только латиница, цифры, символы @._-"
            onKeyDown={onlyEmailChars}
          />
          <small>На этот адрес будет отправлено письмо для подтверждения</small>
        </div>
        <div className="form-group">
          <label>Ник (уникальный)*:</label>
          <input
            type="text"
            value={username}
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
          />
          <small>Пароль должен содержать хотя бы одну заглавную, одну прописную букву и цифру</small>
        </div>
        <h3>Адрес доставки</h3>
        <div className="form-group">
          <label>Индекс*:</label>
          <input
            type="text"
            value={addrIndex}
            onChange={(e) => setAddrIndex(e.target.value)}
            placeholder="6 цифр"
            maxLength={6}
            pattern="^[0-9]+$"
            title="Только цифры (6 символов)"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Город*:</label>
          <input
            type="text"
            value={addrCity}
            onChange={(e) => setAddrCity(e.target.value)}
            placeholder="Город"
            maxLength={15}
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Улица*:</label>
          <input
            type="text"
            value={addrStreet}
            onChange={(e) => setAddrStreet(e.target.value)}
            placeholder="Улица"
            maxLength={25}
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Номер дома*:</label>
          <input
            type="text"
            value={addrHouse}
            onChange={(e) => setAddrHouse(e.target.value)}
            placeholder="Номер дома"
            maxLength={5}
            pattern="^[0-9]+$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Номер строения:</label>
          <input
            type="text"
            value={addrStructure}
            onChange={(e) => setAddrStructure(e.target.value)}
            placeholder="Номер строения"
            maxLength={2}
            pattern="^[0-9]*$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Номер квартиры:</label>
          <input
            type="text"
            value={addrApart}
            onChange={(e) => setAddrApart(e.target.value)}
            placeholder="Номер квартиры"
            maxLength={3}
            pattern="^[0-9]*$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
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
