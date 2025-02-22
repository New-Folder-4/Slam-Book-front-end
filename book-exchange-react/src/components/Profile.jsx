// src/components/Profile.jsx
import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const saveProfile = () => {
    setMessage('Данные профиля сохранены (демо).');
  };

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
      <button onClick={saveProfile}>Сохранить изменения</button>
      {message && <p>{message}</p>}

      <h3>История обменов</h3>
      <p>Пока нет завершённых обменов.</p>

      <h3>Ваш рейтинг: 4.5</h3>
    </div>
  );
}

export default Profile;
