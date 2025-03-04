// src/components/AdminPanel.jsx
import React, { useState, useRef, useEffect } from 'react';

function AdminPanel() {
  const [users, setUsers] = useState([
    { id: 1, name: 'UserOne', blocked: false },
    { id: 2, name: 'UserTwo', blocked: true },
    { id: 3, name: 'UserThree', blocked: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Задаём стартовые ширины столбцов так, чтобы при открытии выглядело как на скриншоте
  const [colWidths, setColWidths] = useState([40, 350, 120, 160]);
  const [draggingCol, setDraggingCol] = useState(-1);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleBlockToggle = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, blocked: !u.blocked } : u
      )
    );
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onMouseDown = (e, index) => {
    setDraggingCol(index);
    setStartX(e.clientX);
    setStartWidth(colWidths[index]);
  };

  const onMouseMove = (e) => {
    if (draggingCol === -1) return;
    const delta = e.clientX - startX;
    const newWidth = Math.max(startWidth + delta, 40);
    setColWidths((prev) => {
      const updated = [...prev];
      updated[draggingCol] = newWidth;
      return updated;
    });
  };

  const onMouseUp = () => {
    setDraggingCol(-1);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <p>Чат поддержки (демо). Здесь можно блокировать и разблокировать пользователей.</p>
      <div className="search-block">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск пользователя"
        />
        <button>Найти</button>
      </div>
      <table className="user-table" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: colWidths[0] }}>
              ID
              <span
                className="resizer"
                onMouseDown={(e) => onMouseDown(e, 0)}
              />
            </th>
            <th style={{ width: colWidths[1] }}>
              Имя пользователя
              <span
                className="resizer"
                onMouseDown={(e) => onMouseDown(e, 1)}
              />
            </th>
            <th style={{ width: colWidths[2] }}>
              Статус
              <span
                className="resizer"
                onMouseDown={(e) => onMouseDown(e, 2)}
              />
            </th>
            <th style={{ width: colWidths[3] }}>
              Действие
              <span
                className="resizer"
                onMouseDown={(e) => onMouseDown(e, 3)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.blocked ? 'Заблокирован' : 'Активен'}</td>
              <td>
                <button onClick={() => handleBlockToggle(u.id)}>
                  {u.blocked ? 'Разблокировать' : 'Заблокировать'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
