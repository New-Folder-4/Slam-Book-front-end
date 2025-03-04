import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const saveProfile = () => {
    setMessage('Данные профиля сохранены (демо).');
  };

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
  ];

  return (
    <div className="profile-page">
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
            onClick={() => setSelectedAvatar(src)}
          >
            <img 
              src={src} 
              alt={`avatar-${index + 1}`} 
              className={
                selectedAvatar === src 
                  ? 'avatar-image selected' 
                  : 'avatar-image'
              }
            />
          </div>
        ))}
      </div>

      <button onClick={saveProfile}>Сохранить изменения</button>
      {message && <p>{message}</p>}
      <h3>История обменов</h3>
      <p>Пока нет завершённых обменов.</p>
      <h3>Ваш рейтинг: 4.5</h3>
    </div>
  );
}

export default Profile;
