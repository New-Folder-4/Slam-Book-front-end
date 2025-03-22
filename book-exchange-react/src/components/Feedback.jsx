import React, { useState, useEffect } from 'react'

function Feedback() {
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState('')

  // Устанавливаем заголовок вкладки
  useEffect(() => {
    document.title = 'Обратная связь'
  }, [])

  const sendMessage = () => {
    if (msg.trim() !== '') {
      // В openapi.yaml нет эндпоинта для отправки сообщения от пользователя
      // Здесь демо-реализация без реального запроса
      setStatus('Сообщение отправлено администратору (демо).')
      setMsg('')
    }
  }

  return (
    <div className="profile-page page-fade-in">
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
  )
}

export default Feedback
