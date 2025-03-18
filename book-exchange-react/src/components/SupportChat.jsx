import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function SupportChat() {
  const { userId } = useParams()
  const [messages, setMessages] = useState([
    { from: 'user', text: 'Здравствуйте, есть проблема...' },
    { from: 'admin', text: 'Опишите подробнее вашу проблему' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { from: 'admin', text: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Чат поддержки с пользователем {userId}</h2>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          maxHeight: '300px',
          overflowY: 'auto',
          marginBottom: '10px'
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.from === 'admin' ? 'right' : 'left',
              margin: '5px 0'
            }}
          >
            <strong>{msg.from === 'admin' ? 'Админ' : 'Пользователь'}:</strong>
            {' '}{msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1 }}
          placeholder="Введите сообщение..."
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default SupportChat
