// src/components/Feedback.js
import React, { useState } from 'react';

function Feedback() {
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = () => {
    if (msg.trim() !== '') {
      setStatus('Сообщение отправлено администратору (демо).');
      setMsg('');
    }
  };

  return (
    <div className="feedback-page">
      <h2>Обратная связь</h2>
      <div className="form-group">
        <label>Новое сообщение для администратора:</label>
        <textarea 
          rows="3" 
          value={msg} 
          onChange={(e) => setMsg(e.target.value)} 
          placeholder="Введите сообщение"
        />
      </div>
      <button onClick={sendMessage}>Отправить</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Feedback;
