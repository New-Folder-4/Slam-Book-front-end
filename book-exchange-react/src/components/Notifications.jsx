import React from 'react';

function Notifications() {
  const notifications = [
    { id: 1, text: 'Напишите user101@mail.com, чтобы забрать книгу' },
    { id: 2, text: 'Напишите user228337@example.com, чтобы отдать книгу "101 алматинец"' },
  ];

  return (
    <div className="profile-page page-fade-in">
      <h2>Уведомления</h2>
      <div className="form-group">
        {notifications.length > 0 ? (
          <ul style={{ padding: 0, listStyleType: 'none' }}>
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                {notification.text}
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