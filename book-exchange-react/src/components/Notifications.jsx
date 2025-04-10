import React, { useState, useEffect } from 'react';

function Notifications() {
  // Инициализация состояния для уведомлений
  const [notifications, setNotifications] = useState([]);

  // Получаем токен из localStorage для аутентификации
  const token = localStorage.getItem('token');

  // Получение уведомлений с back-end при монтировании компонента
  useEffect(() => {
    fetch('http://localhost:1934/notification', {
      headers: { Authorization: `Bearer ${token}` } // Передача токена в заголовке
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при получении уведомлений');
        }
        return response.json();
      })
      .then((data) => {
        // data — массив уведомлений, каждый с полями idNotification, book и email
        setNotifications(data);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  }, [token]);

  // Функция для формирования текста уведомления в зависимости от наличия книги
  const getNotificationText = (notification) => {
    if (notification.book === null || notification.book === '') {
      return `Напишите на почту ${notification.email} чтобы забрать книгу`;
    }
    return `Напишите на почту ${notification.email} чтобы отдать книгу "${notification.book}"`;
  };

  return (
    <div className="profile-page page-fade-in">
      <h2>Уведомления</h2>
      <div className="form-group">
        {notifications.length > 0 ? (
          <ul style={{ padding: 0, listStyleType: 'none' }}>
            {notifications.map((notification) => (
              <li key={notification.idNotification} className="notification-item">
                {getNotificationText(notification)}
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас пока нет уведомлений.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
