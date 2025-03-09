import React, { useState, useRef } from 'react'

function Profile({ onAvatarSelect }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
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
    '/avatars/avatar10.png'
  ]
  const [uploadedAvatars, setUploadedAvatars] = useState([])
  const fileInputRef = useRef(null)

  const saveProfile = () => {
    setMessage('Данные профиля сохранены (демо).')
  }

  const handleAddCustomAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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

  const handleAvatarClick = (src) => {
    setSelectedAvatar(src)
    if (onAvatarSelect) {
      onAvatarSelect(src)
    }
  }

  const placeholdersCount = 3 - uploadedAvatars.length

  return (
    <div className="profile-page page-fade-in">
      <h2>Личный кабинет</h2>
      <div className="form-group">
        <label>Имя:</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
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
      <h3>Выбрать аватар</h3>
      <div className="avatar-container">
        {avatarList.map((src, index) => (
          <div
            key={index}
            className="avatar-item"
            onClick={() => handleAvatarClick(src)}
          >
            <img 
              src={src}
              alt={`avatar-${index + 1}`}
              className={selectedAvatar === src ? 'avatar-image selected' : 'avatar-image'}
            />
          </div>
        ))}
      </div>
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
      <div className="avatar-container" style={{ marginTop: '15px' }}>
        {uploadedAvatars.map((src, idx) => (
          <div
            key={`uploaded-${idx}`}
            className="avatar-item"
            onClick={() => handleAvatarClick(src)}
          >
            <img
              src={src}
              alt={`custom-avatar-${idx + 1}`}
              className={selectedAvatar === src ? 'avatar-image selected' : 'avatar-image'}
            />
          </div>
        ))}
        {Array.from({ length: placeholdersCount }, (_, i) => (
          <div key={`placeholder-${i}`} className="avatar-item">
            <div
              style={{
                background: '#ccc',
                width: '100%',
                height: '100%',
                borderRadius: '50%'
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={saveProfile} style={{ marginTop: '15px' }}>
        Сохранить изменения
      </button>
      {message && <p>{message}</p>}
      <h3>История обменов</h3>
      <p>Пока нет завершённых обменов.</p>
      <h3>Ваш рейтинг: 4.5</h3>
    </div>
  )
}

export default Profile
