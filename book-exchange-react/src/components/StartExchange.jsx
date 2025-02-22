// src/components/StartExchange.jsx
import React, { useState } from 'react';

function StartExchange() {
  const [giveTitle, setGiveTitle] = useState('');
  const [giveAuthor, setGiveAuthor] = useState('');
  const [giveYear, setGiveYear] = useState('');

  const [getCategory, setGetCategory] = useState('фантастика');
  const [getTitle, setGetTitle] = useState('');

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  const handleSubmit = () => {
    alert('Заявка на обмен успешно создана (демо)!');
    // Сброс полей
    setGiveTitle('');
    setGiveAuthor('');
    setGiveYear('');
    setGetCategory('фантастика');
    setGetTitle('');
    setCity('');
    setStreet('');
    setHouse('');
  };

  return (
    <div className="start-exchange-game">
      <h2>Обмен книгами</h2>

      <div className="exchange-container">
        {/* Левая колонка (что отдаёте) */}
        <div className="give-column">
          <h3>Вы отдаёте</h3>
          <div className="form-group">
            <label>Название книги:</label>
            <input 
              type="text" 
              value={giveTitle} 
              onChange={(e) => setGiveTitle(e.target.value)} 
              placeholder="Мастер и Маргарита"
            />
          </div>
          <div className="form-group">
            <label>Автор:</label>
            <input 
              type="text" 
              value={giveAuthor} 
              onChange={(e) => setGiveAuthor(e.target.value)} 
              placeholder="Булгаков"
            />
          </div>
          <div className="form-group">
            <label>Год издания (при наличии):</label>
            <input 
              type="number" 
              value={giveYear} 
              onChange={(e) => setGiveYear(e.target.value)} 
              placeholder="1967"
            />
          </div>
        </div>

        {/* Правая колонка (что хотите получить) */}
        <div className="get-column">
          <h3>Вы получаете</h3>
          <div className="form-group">
            <label>Категория/Жанр:</label>
            <select 
              value={getCategory} 
              onChange={(e) => setGetCategory(e.target.value)}
            >
              <option value="фантастика">Фантастика</option>
              <option value="детектив">Детектив</option>
              <option value="классика">Классика</option>
              <option value="комикс">Комикс</option>
              <option value="история">История</option>
            </select>
          </div>
          <div className="form-group">
            <label>Название (если конкретное):</label>
            <input 
              type="text" 
              value={getTitle} 
              onChange={(e) => setGetTitle(e.target.value)} 
              placeholder="Укажите книгу, если точно знаете"
            />
          </div>
        </div>
      </div>

      {/* Блок адреса */}
      <div className="address-block">
        <h3>Адрес доставки</h3>
        <div className="form-group">
          <label>Город:</label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Москва"
          />
        </div>
        <div className="form-group">
          <label>Улица:</label>
          <input 
            type="text" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)} 
            placeholder="Тверская"
          />
        </div>
        <div className="form-group">
          <label>Дом/Кв.:</label>
          <input 
            type="text" 
            value={house} 
            onChange={(e) => setHouse(e.target.value)} 
            placeholder="10, кв. 12"
          />
        </div>
      </div>

      <button onClick={handleSubmit}>Подтвердить обмен</button>
    </div>
  );
}

export default StartExchange;
