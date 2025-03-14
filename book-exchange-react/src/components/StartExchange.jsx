import React, { useState } from 'react'

function StartExchange() {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])

  const [giveTitle, setGiveTitle] = useState('')
  const [giveAuthor, setGiveAuthor] = useState('')
  const [giveYear, setGiveYear] = useState('')
  const [giveISBN, setGiveISBN] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])

  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')

  const allGenres = [
    'Эпическое фэнтези',
    'Темное фэнтези',
    'Урбан-фэнтези',
    'Магический реализм',
    'ЛитРПГ',
    'Мифологическое фэнтези',
    'Космическая опера',
    'Киберпанк',
    'Стимпанк',
    'Биопанк',
    'Соларпанк',
    'Посткиберпанк',
    'Классический детектив',
    'Нуар',
    'Полицейский детектив',
    'Шпионский детектив',
    'Судебный детектив',
    'Психологический триллер',
    'Шпионский триллер',
    'Юридический триллер',
    'Военный триллер',
    'Политический триллер',
    'Готический ужас',
    'Психологический ужас',
    'Слэшер',
    'Космический ужас',
    'Сверхъестественный ужас',
    'Паранормальная мистика',
    'Эзотерическая литература',
    'Любовный роман',
    'Исторический роман',
    'Современный роман',
    'Психологический роман',
    'Социальный роман',
    'Эротический роман',
    'Молодёжный роман',
    'Морские приключения',
    'Путешествия',
    'Экспедиционный роман',
    'Социальный реализм',
    'Психологический реализм',
    'Антиутопия',
    'Постапокалиптическая литература',
    'Поток сознания',
    'Постмодернизм',
    'Абсурдизм',
    'Сатирическая проза',
    'Ироническая литература',
    'Комедийный роман',
    'Биографии и автобиографии',
    'Мемуары',
    'Документальная литература',
    'Научно-популярная литература',
    'Публицистика и журналистика',
    'Историческая литература',
    'Философская литература',
    'Психология',
    'Экономика и финансы',
    'Саморазвитие и мотивация',
    'Путешествия и путевые заметки',
    'Кулинария',
    'Искусствоведение',
    'Сказки',
    'Детские рассказы',
    'Подростковая литература (YA)',
    'Иллюстрированная литература',
    'Лирическая поэзия',
    'Эпическая поэзия',
    'Визуальная поэзия',
    'Экспериментальная поэзия',
    'Театральные пьесы',
    'Мюзиклы',
    'Сценарии',
    'Супергеройские комиксы',
    'Инди-комиксы',
    'Манга',
    'Веб-комиксы',
    'Народные сказания',
    'Легенды и мифы',
    'Пословицы и поговорки',
    'Электронная литература',
    'Интерактивные рассказы'
  ]

  const onlyLetters = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /[A-Za-zА-Яа-яЁё\s-]/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

  const onlyDigits = (e) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        /^[0-9]$/.test(e.key)
      )
    ) {
      e.preventDefault()
    }
  }

  const handleISBNKeyDown = (e) => {
    if (
      giveISBN.length >= 13 &&
      !(
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      )
    ) {
      e.preventDefault()
      return
    }
    onlyDigits(e)
  }

  const handleGenreChange = (checked, genre) => {
    if (checked) {
      setSelectedGenres((prev) => {
        const updated = [...prev, genre]
        if (updated.length === filteredGenres.length) setSelectAll(true)
        return updated
      })
    } else {
      setSelectedGenres((prev) => {
        const updated = prev.filter((g) => g !== genre)
        setSelectAll(false)
        return updated
      })
    }
  }

  const toggleSelectAll = (checked) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedGenres(filteredGenres)
    } else {
      setSelectedGenres([])
    }
  }

  const filteredGenres = allGenres.filter((g) =>
    g.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNext = () => {
    const newErrors = []
    if (step === 1) {
      if (!giveTitle.trim()) newErrors.push('Укажите название книги')
      if (!giveAuthor.trim()) newErrors.push('Укажите автора книги')
      if (!giveYear.trim()) {
        newErrors.push('укажите год издания')
      } else {
        const yearNum = parseInt(giveYear, 10)
        if (yearNum >= 2026) newErrors.push('неверный год издания')
      }
      if (giveISBN.length < 10) newErrors.push('не верный ISBN')
      if (newErrors.length === 0) {
        setErrors([])
        setStep(2)
        return
      }
    }
    if (step === 2) {
      if (selectedGenres.length === 0) {
        newErrors.push('Пожалуйста, выберите хотя бы один жанр.')
      }
      if (newErrors.length === 0) {
        setErrors([])
        setStep(3)
        return
      }
    }
    setErrors(newErrors)
  }

  const handleBack = () => {
    setErrors([])
    setStep(step - 1)
  }

  const handleSubmit = () => {
    const newErrors = []
    if (!city.trim() || !street.trim() || !house.trim()) {
      newErrors.push('Пожалуйста, заполните все поля адреса доставки.')
    }
    if (newErrors.length === 0) {
      setErrors([])
      setGiveTitle('')
      setGiveAuthor('')
      setGiveYear('')
      setGiveISBN('')
      setSelectedGenres([])
      setSearchQuery('')
      setSelectAll(false)
      setCity('')
      setStreet('')
      setHouse('')
      setStep(1)
      return
    }
    setErrors(newErrors)
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
              style={{ width: '90%' }}
              type="text"
              value={giveTitle}
              onChange={(e) => setGiveTitle(e.target.value)}
              placeholder="Мастер и Маргарита"
            />
          </div>
          <div className="form-group">
            <label>Автор:</label>
            <input
              style={{ width: '90%' }}
              type="text"
              value={giveAuthor}
              onChange={(e) => setGiveAuthor(e.target.value)}
              placeholder="Булгаков"
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Год издания:</label>
            <input
              style={{ width: '90%' }}
              type="text"
              value={giveYear}
              onChange={(e) => setGiveYear(e.target.value)}
              placeholder="1967"
              pattern="^[0-9]+$"
              title="Только цифры"
              onKeyDown={onlyDigits}
            />
          </div>
          <div className="form-group">
            <label>ISBN (при наличии):</label>
            <input
              style={{ width: '90%' }}
              type="text"
              value={giveISBN}
              onChange={(e) => setGiveISBN(e.target.value)}
              placeholder="ISBN"
              pattern="^[0-9]{10,13}$"
              title="Только цифры (от 10 до 13 символов)"
              onKeyDown={handleISBNKeyDown}
            />
          </div>
          <div
            className="step-navigation"
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              justifyContent: 'flex-start',
            }}
          >
            <button onClick={handleNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h3>Шаг 2: Хочу получить</h3>
          <p>Выберите один или несколько жанров:</p>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSelectAll(false)
                setSelectedGenres((prev) =>
                  prev.filter((g) =>
                    g.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                )
              }}
              placeholder="Поиск по жанрам..."
              style={{ width: '90%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
              {' '}Выбрать все
            </label>
          </div>
          <div
            style={{
              maxHeight: '150px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            {filteredGenres.map((genre) => (
              <div key={genre} style={{ marginBottom: '5px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => handleGenreChange(e.target.checked, genre)}
                  />
                  {' '}{genre}
                </label>
              </div>
            ))}
          </div>
          <div
            className="step-navigation"
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              justifyContent: 'flex-start',
            }}
          >
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
              style={{ width: '90%' }}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Москва"
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Улица:</label>
            <input
              style={{ width: '90%' }}
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Тверская"
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Дом/Кв.:</label>
            <input
              style={{ width: '90%' }}
              type="text"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              placeholder="10, кв. 12"
              pattern="^[0-9]+$"
              title="Только цифры"
              onKeyDown={onlyDigits}
            />
          </div>
          <div
            className="step-navigation"
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              justifyContent: 'flex-start',
            }}
          >
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleSubmit}>Подтвердить обмен</button>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {errors.map((err, i) => (
            <p key={i} style={{ color: 'red', margin: 0 }}>
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default StartExchange
