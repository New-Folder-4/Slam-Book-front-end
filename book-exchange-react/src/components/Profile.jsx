import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile({ onAvatarSelect, setIsLoggedIn, setIsAdmin, setHeaderAvatar }) {
  // Состояния для хранения данных профиля
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  // Состояния для редактирования профиля
  const [editLastName, setEditLastName] = useState('')
  const [editFirstName, setEditFirstName] = useState('')
  const [editSecondName, setEditSecondName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')

  // Состояния управления интерфейсом
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  // Получаем токен из localStorage (если используется)
  const token = localStorage.getItem('token')

  // При монтировании компонента загружаем профиль и выбранную аватарку
  useEffect(() => {
    document.title = 'Личный кабинет'

    axios.get('http://localhost:1934/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        const profile = response.data
        setLastName(profile.lastName || '')
        setFirstName(profile.firstName || '')
        setSecondName(profile.secondName || '')
        setUsername(profile.userName || '')
        setEmail(profile.email || '')
        localStorage.setItem('lastName', profile.lastName || '')
        localStorage.setItem('firstName', profile.firstName || '')
        localStorage.setItem('secondName', profile.secondName || '')
        localStorage.setItem('username', profile.userName || '')
        localStorage.setItem('email', profile.email || '')
      })
      .catch((error) => {
        console.error('Ошибка получения профиля:', error)
      })

    // Берём выбранную аватарку из localStorage, если она установлена
    const storedAvatar = localStorage.getItem('selectedAvatar')
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar)
    }
  }, [token])

  // Список стандартных аватарок
  const avatarList = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png',
    '/avatars/avatar6.png',
    '/avatars/avatar7.png',
    '/avatars/avatar8.png',
    '/avatars/avatar9.png',
    '/avatars/avatar10.png',
    '/avatars/avatar11.png',
    '/avatars/avatar12.png',
    '/avatars/avatar13.png',
    '/avatars/avatar14.png',
    '/avatars/avatar15.png'
  ]

  // Функция, разрешающая ввод только букв (английские и русские)
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

  // Функция, запрещающая ввод кириллицы (например, для email)
  const noCyrillic = (e) => {
    const cyrillicPattern = /[а-яА-ЯёЁ]/
    if (cyrillicPattern.test(e.key)) {
      e.preventDefault()
    }
  }

  // Обработчик входа в режим редактирования профиля
  const handleEditClick = () => {
    setEditLastName(lastName)
    setEditFirstName(firstName)
    setEditSecondName(secondName)
    setEditUsername(username)
    setEditEmail(email)
    setIsEditing(true)
  }

  // Отмена редактирования
  const handleCancelClick = () => {
    setIsEditing(false)
  }

  // Сохранение изменений профиля
  const handleSaveClick = () => {
    const payload = {
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
      userName: editUsername
    }
    axios.put('http://localhost:1934/user/profile', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setLastName(editLastName)
        setFirstName(editFirstName)
        setSecondName(editSecondName)
        setUsername(editUsername)
        setEmail(editEmail)
        localStorage.setItem('lastName', editLastName)
        localStorage.setItem('firstName', editFirstName)
        localStorage.setItem('secondName', editSecondName)
        localStorage.setItem('username', editUsername)
        localStorage.setItem('email', editEmail)
        setMessage('Данные профиля сохранены.')
        setIsEditing(false)
      })
      .catch((error) => {
        setMessage('Ошибка сохранения профиля.')
        console.error(error)
      })
  }

  // Обработчик загрузки собственной аватарки
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      // Используем ключ 'file' (должен совпадать с настройками на сервере)
      formData.append('file', file)

      axios.post('http://localhost:1934/avatars/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        // Ожидаем, что сервер вернёт { avatarUrl: "http://localhost:1934/avatars/152" }
        const newAvatarUrl = response.data.avatarUrl
        if (!newAvatarUrl) {
          setMessage('Сервер не вернул URL аватарки.')
          return
        }
        setSelectedAvatar(newAvatarUrl)
        localStorage.setItem('selectedAvatar', newAvatarUrl)
        // Обновляем аватарку в шапке через функцию, переданную из App.jsx
        if (setHeaderAvatar) {
          setHeaderAvatar(newAvatarUrl)
        }
        if (onAvatarSelect) {
          onAvatarSelect(newAvatarUrl)
        }
        setMessage('Аватар успешно загружен.')
      })
      .catch((error) => {
        setMessage('Ошибка загрузки аватара.')
        console.error('Ошибка загрузки аватара:', error)
      })
    }
  }

  // Открытие диалога выбора файла
  const handleAddCustomAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Обработчик выбора стандартной аватарки
  const handleAvatarClick = (src) => {
    setSelectedAvatar(src)
    localStorage.setItem('selectedAvatar', src)
    if (setHeaderAvatar) {
      setHeaderAvatar(src)
    }
    if (onAvatarSelect) {
      onAvatarSelect(src)
    }
  }

  // Переход к редактированию адреса доставки
  const handleEditAddressClick = () => {
    navigate('/profile/edit-address')
  }

  // Выход из профиля
  const handleLogout = () => {
    localStorage.removeItem('lastName')
    localStorage.removeItem('firstName')
    localStorage.removeItem('secondName')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('selectedAvatar')
    localStorage.removeItem('addrIndex')
    localStorage.removeItem('addrCity')
    localStorage.removeItem('addrStreet')
    localStorage.removeItem('addrHouse')
    localStorage.removeItem('addrStructure')
    localStorage.removeItem('addrApart')
    localStorage.removeItem('isAdmin')

    if (setIsLoggedIn) setIsLoggedIn(false)
    if (setIsAdmin) setIsAdmin(false)
    if (setHeaderAvatar) {
      setHeaderAvatar('')
    }

    navigate('/login')
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Личный кабинет</h2>

      {/* Отображение данных профиля (режим просмотра) */}
      {!isEditing && (
        <>
          <p><strong>Фамилия:</strong> {lastName}</p>
          <p><strong>Имя:</strong> {firstName}</p>
          <p><strong>Отчество:</strong> {secondName}</p>
          <p><strong>Ник:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <button onClick={handleEditClick} style={{ marginTop: '20px' }}>
            Изменить
          </button>
        </>
      )}

      {/* Форма редактирования профиля */}
      {isEditing && (
        <div className="form-fields" style={{ maxWidth: '640px', margin: '20px auto' }}>
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Отчество:</label>
            <input
              type="text"
              value={editSecondName}
              onChange={(e) => setEditSecondName(e.target.value)}
              pattern="^[A-Za-zА-Яа-яЁё\s-]*$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Ник:</label>
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              pattern="^[A-Za-z0-9_]+$"
              title="Только латинские буквы, цифры и подчёркивания"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              pattern="^[A-Za-z0-9@._\\-]+$"
              title="Только латиница, цифры, символы @._-"
              onKeyDown={noCyrillic}
            />
          </div>
          <div className="save-btn-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={handleCancelClick}>Отмена</button>
            <button onClick={handleSaveClick}>Сохранить</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleEditAddressClick}>Изменить адрес доставки</button>
      </div>

      {/* Секция выбора стандартных аватарок */}
      <div className="avatar-grid" style={{ marginTop: '40px' }}>
        {avatarList.map((src, index) => (
          <div
            key={index}
            className={selectedAvatar === src ? 'avatar-item selected-avatar' : 'avatar-item'}
            onClick={() => handleAvatarClick(src)}
          >
            <img src={src} alt={`avatar-${index + 1}`} className="avatar-image" />
          </div>
        ))}
      </div>

      {/* Секция загрузки собственной аватарки */}
      <div className="upload-btn-container">
        <button onClick={handleAddCustomAvatarClick}>Добавить свою аватарку</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="save-btn-container" style={{ marginTop: '20px' }}>
        <button onClick={() => setMessage('Данные профиля сохранены (демо).')}>
          Сохранить изменения
        </button>
      </div>
      {message && <p className="save-message">{message}</p>}

      <div className="profile-footer" style={{ marginTop: '20px' }}>
        <h3>История обменов</h3>
        <p>Пока нет завершённых обменов.</p>
        <h3>Ваш рейтинг: 4.5</h3>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  )
}

export default Profile
