import React, { useState } from 'react'

function StartExchange() {
  const [step, setStep] = useState(1)
  const [giveTitle, setGiveTitle] = useState('')
  const [giveAuthor, setGiveAuthor] = useState('')
  const [giveYear, setGiveYear] = useState('')
  const [giveISBN, setGiveISBN] = useState('')
  const [getCategory, setGetCategory] = useState('фантастика')
  const [getTitle, setGetTitle] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleNext = () => {
    if (step === 1) {
      if (!giveTitle.trim() || !giveAuthor.trim() || !giveYear.trim()) {
        setMessage('Пожалуйста, заполните все обязательные поля для книги, которую отдаёте.')
        setIsError(true)
        return
      }
    }
    if (step === 2) {
      if (!getCategory) {
        setMessage('Пожалуйста, выберите хотя бы один жанр (категорию).')
        setIsError(true)
        return
      }
    }
    setMessage('')
    setIsError(false)
    setStep(step + 1)
  }

  const handleBack = () => {
    setMessage('')
    setIsError(false)
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (!city.trim() || !street.trim() || !house.trim()) {
      setMessage('Пожалуйста, заполните все поля адреса доставки.')
      setIsError(true)
      return
    }
    setMessage('Заявка на обмен успешно создана (демо)!')
    setIsError(false)

    setGiveTitle('')
    setGiveAuthor('')
    setGiveYear('')
    setGiveISBN('')
    setGetCategory('фантастика')
    setGetTitle('')
    setCity('')
    setStreet('')
    setHouse('')
    setStep(1)
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Обмен книгами</h2>
      {step === 1 && (
        <div className="step-content">
          <h3>Шаг 1: Хочу обменять</h3>
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
            <label>Год издания:</label>
            <input
              type="number"
              value={giveYear}
              onChange={(e) => setGiveYear(e.target.value)}
              placeholder="1967"
            />
          </div>
          <div className="form-group">
            <label>ISBN (при наличии):</label>
            <input
              type="text"
              value={giveISBN}
              onChange={(e) => setGiveISBN(e.target.value)}
              placeholder="ISBN"
            />
          </div>
          <div className="step-navigation">
            <button onClick={handleNext}>Далее</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="step-content">
          <h3>Шаг 2: Хочу получить</h3>
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
          <div className="step-navigation">
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleNext}>Далее</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="step-content">
          <h3>Шаг 3: Адрес доставки</h3>
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
          <div className="step-navigation">
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleSubmit}>Подтвердить обмен</button>
          </div>
        </div>
      )}
      {message && (
        <p className={isError ? 'error-message' : 'status-message'}>
          {message}
        </p>
      )}
    </div>
  )
}

export default StartExchange
