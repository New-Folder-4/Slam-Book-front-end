import React, { useState, useRef } from 'react'

function Profile({ onAvatarSelect }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [uploadedAvatars, setUploadedAvatars] = useState([])
  const fileInputRef = useRef(null)

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

  // Разрешаем только буквы + служебные
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

  // Разрешаем только латинские буквы, цифры, @ . _ - + служебные
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
    if (onAvatarSelect) {
      onAvatarSelect(src)
    }
  }

  const saveProfile = () => {
    setMessage('Данные профиля сохранены (демо).')
  }

  const placeholdersCount = 3 - uploadedAvatars.length

  return (
    <div className="profile-page page-fade-in">
      <h2>Личный кабинет</h2>

      <div className="form-fields">
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            pattern="^[A-Za-z0-9@._-]+$"
            title="Только латиница, цифры, символы @._-"
            onKeyDown={onlyEmailChars}
          />
        </div>
        <div className="form-group">
          <label>Адрес доставки:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ваш адрес"
          />
        </div>
      </div>

      <div className="avatar-grid">
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

      <div className="save-btn-container">
        <button onClick={saveProfile}>Сохранить изменения</button>
      </div>
      {message && <p className="save-message">{message}</p>}

      <div className="profile-footer">
        <h3>История обменов</h3>
        <p>Пока нет завершённых обменов.</p>
        <h3>Ваш рейтинг: 4.5</h3>
      </div>
    </div>
  )
}

export default Profile
