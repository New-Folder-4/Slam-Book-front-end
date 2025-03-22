import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({ onAvatarSelect, setIsLoggedIn, setIsAdmin, setHeaderAvatar }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [editLastName, setEditLastName] = useState('')
  const [editFirstName, setEditFirstName] = useState('')
  const [editSecondName, setEditSecondName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [uploadedAvatars, setUploadedAvatars] = useState([])
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Личный кабинет'
    const storedLastName = localStorage.getItem('lastName') || ''
    const storedFirstName = localStorage.getItem('firstName') || ''
    const storedSecondName = localStorage.getItem('secondName') || ''
    const storedUsername = localStorage.getItem('username') || ''
    const storedEmail = localStorage.getItem('email') || ''

    setLastName(storedLastName)
    setFirstName(storedFirstName)
    setSecondName(storedSecondName)
    setUsername(storedUsername)
    setEmail(storedEmail)

    const storedAvatar = localStorage.getItem('selectedAvatar')
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar)
    }
  }, [])

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

  const noCyrillic = (e) => {
    const cyrillicPattern = /[а-яА-ЯёЁ]/
    if (cyrillicPattern.test(e.key)) {
      e.preventDefault()
    }
  }

  const handleEditClick = () => {
    setEditLastName(lastName)
    setEditFirstName(firstName)
    setEditSecondName(secondName)
    setEditUsername(username)
    setEditEmail(email)
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const handleSaveClick = () => {
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
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev) => {
        setUploadedAvatars((prev) => {
          const newAvatars = [...prev, ev.target.result]
          return newAvatars.slice(-3)
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCustomAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarClick = (src) => {
    setSelectedAvatar(src)
    localStorage.setItem('selectedAvatar', src)
    if (onAvatarSelect) {
      onAvatarSelect(src)
    }
  }

  const placeholdersCount = 3 - uploadedAvatars.length

  const handleEditAddressClick = () => {
    navigate('/profile/edit-address')
  }

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

    // Сбрасываем аватарку в шапке
    if (setHeaderAvatar) {
      setHeaderAvatar('')
    }

    navigate('/login')
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Личный кабинет</h2>

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
              pattern="^[A-Za-z0-9@._-]+$"
              title="Только латиница, цифры, символы @._-"
              onKeyDown={noCyrillic}
            />
          </div>
          <div
            className="save-btn-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px'
            }}
          >
            <button onClick={handleCancelClick}>Отмена</button>
            <button onClick={handleSaveClick}>Сохранить</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleEditAddressClick}>
          Изменить адрес доставки
        </button>
      </div>

      <div className="avatar-grid" style={{ marginTop: '40px' }}>
        {avatarList.map((src, index) => (
          <div
            key={index}
            className={
              selectedAvatar === src
                ? 'avatar-item selected-avatar'
                : 'avatar-item'
            }
            onClick={() => handleAvatarClick(src)}
          >
            <img
              src={src}
              alt={`avatar-${index + 1}`}
              className="avatar-image"
            />
          </div>
        ))}
      </div>

      <div className="upload-btn-container">
        <button onClick={handleAddCustomAvatarClick}>
          Добавить свою аватарку
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="avatar-grid-small">
        {uploadedAvatars.map((src, idx) => (
          <div
            key={`uploaded-${idx}`}
            className={
              selectedAvatar === src
                ? 'avatar-item selected-avatar'
                : 'avatar-item'
            }
            onClick={() => handleAvatarClick(src)}
          >
            <img
              src={src}
              alt={`custom-avatar-${idx + 1}`}
              className="avatar-image"
            />
          </div>
        ))}
        {Array.from({ length: placeholdersCount }, (_, i) => (
          <div key={`placeholder-${i}`} className="avatar-item placeholder" />
        ))}
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
