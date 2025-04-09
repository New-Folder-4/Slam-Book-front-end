import React, { useState, useEffect } from 'react'
import axios from 'axios'

function StartExchange() {
  // Этапы: 1 – Главное окно, 2 – Добавление книги, 3 – Выбор жанров, 4 – Подтверждение выбора
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])

  // Данные книги (этап 2)
  const [giveTitle, setGiveTitle] = useState('')
  const [giveAuthor, setGiveAuthor] = useState('')
  const [giveYear, setGiveYear] = useState('')
  const [giveISBN, setGiveISBN] = useState('')

  // Сохранённые книги
  const [savedBooks, setSavedBooks] = useState([])

  // Этап выбора жанров (этап 3)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])

  // Состояние для wishes (GET отключён – нет запроса)
  const [wishes, setWishes] = useState([])

  // Полный список жанров
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
    'Современная проза',
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

  // Фильтрация жанров
  const filteredGenres = allGenres.filter((g) =>
    g.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Маппинг жанров → числовые ID
  const genreMapping = {
    'Эпическое фэнтези': 1,
    'Темное фэнтези': 2,
    'Урбан-фэнтези': 3,
    'Магический реализм': 4,
    'ЛитРПГ': 5,
    'Мифологическое фэнтези': 6,
    'Космическая опера': 7,
    'Киберпанк': 8,
    'Стимпанк': 9,
    'Биопанк': 10,
    'Соларпанк': 11,
    'Посткиберпанк': 12,
    'Классический детектив': 13,
    'Нуар': 14,
    'Полицейский детектив': 15,
    'Шпионский детектив': 16,
    'Судебный детектив': 17,
    'Психологический триллер': 18,
    'Шпионский триллер': 19,
    'Юридический триллер': 20,
    'Военный триллер': 21,
    'Политический триллер': 22,
    'Готический ужас': 23,
    'Психологический ужас': 24,
    'Слэшер': 25,
    'Космический ужас': 26,
    'Сверхъестественный ужас': 27,
    'Паранормальная мистика': 28,
    'Эзотерическая литература': 29,
    'Любовный роман': 30,
    'Исторический роман': 31,
    'Современная проза': 32,
    'Психологический роман': 33,
    'Социальный роман': 34,
    'Эротический роман': 35,
    'Молодёжный роман': 36,
    'Морские приключения': 37,
    'Путешествия': 38,
    'Экспедиционный роман': 39,
    'Социальный реализм': 40,
    'Психологический реализм': 41,
    'Антиутопия': 42,
    'Постапокалиптическая литература': 43,
    'Поток сознания': 44,
    'Постмодернизм': 45,
    'Абсурдизм': 46,
    'Сатирическая проза': 47,
    'Ироническая литература': 48,
    'Комедийный роман': 49,
    'Биографии и автобиографии': 50,
    'Мемуары': 51,
    'Документальная литература': 52,
    'Научно-популярная литература': 53,
    'Публицистика и журналистика': 54,
    'Историческая литература': 55,
    'Философская литература': 56,
    'Психология': 57,
    'Экономика и финансы': 58,
    'Саморазвитие и мотивация': 59,
    'Путешествия и путевые заметки': 60,
    'Кулинария': 61,
    'Искусствоведение': 62,
    'Сказки': 63,
    'Детские рассказы': 64,
    'Подростковая литература (YA)': 65,
    'Иллюстрированная литература': 66,
    'Лирическая поэзия': 67,
    'Эпическая поэзия': 68,
    'Визуальная поэзия': 69,
    'Экспериментальная поэзия': 70,
    'Театральные пьесы': 71,
    'Мюзиклы': 72,
    'Сценарии': 73,
    'Супергеройские комиксы': 74,
    'Инди-комиксы': 75,
    'Манга': 76,
    'Веб-комиксы': 77,
    'Народные сказания': 78,
    'Легенды и мифы': 79,
    'Пословицы и поговорки': 80,
    'Электронная литература': 81,
    'Интерактивные рассказы': 82
  }

  const mapGenresToIds = (genres) => {
    return genres.map((g) => genreMapping[g]).filter((id) => id !== undefined)
  }

  // -------------- Валидация (строчные функции) --------------
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

  // ---------------- Шаг 2: Добавление автора ----------------
  const handleBookNext1 = async () => {
    const newErrors = []
    if (!giveAuthor.trim()) newErrors.push('Укажите автора книги')
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }
    

    try {
      const token = localStorage.getItem('token') || ''

      // Разбиваем ФИО автора
      const authorParts = giveAuthor.trim().split(' ')
      let authorPayload = {}
      if (authorParts.length > 1) {
        authorPayload = {
          firstName: authorParts.slice(0, -1).join(' '),
          lastName: authorParts[authorParts.length - 1]
        }
      } else {
        authorPayload = { firstName: '', lastName: giveAuthor }
      }

      /*
      // Создаём автора
      const authorRes = await axios.post(
        'http://localhost:1934/authors',
        authorPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const authorId = authorRes.data.idAuthor
      */

      // Сброс формы
      
      setGiveAuthor('')
      setStep(3)
    } catch (error) {
      console.error('Ошибка при создании автора:', error)
      setErrors([error.message])
    }
  }
  const handleBookNext2 = async () => {
    const newErrors = []
    if (!giveTitle.trim()) newErrors.push('Укажите название книги')
    
    if (!giveYear.trim()) {
      newErrors.push('Укажите год издания')
    } else {
      const yearNum = parseInt(giveYear, 10)
      if (yearNum >= 2026) newErrors.push('Неверный год издания')
    }
    if (giveISBN && (giveISBN.length < 10 || giveISBN.length > 13)) {
      newErrors.push('Неверный ISBN (должен быть 10-13 цифр)')
    }
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const token = localStorage.getItem('token') || ''

       //Создаём книгу
      const bookPayload = {
        idBookLiterary: 0,
        //idAuthor: authorId,
        firstName: giveTitle,
        lastName: giveAuthor
      }

      //const bookRes = await axios.post(
      //  'http://localhost:1934/books',
      //  bookPayload,
      //  { headers: { Authorization: `Bearer ${token}` } }
      //)
      //const bookId = bookRes.data.idBookLiterary

       //Сохраняем книгу в массив
      setSavedBooks((prev) => [
        ...prev,
          {
              title: giveTitle, author: giveAuthor, year: giveYear, isbn: giveISBN//, bookId 
          }
      ])

      // Сброс формы
      setGiveTitle('')
      setGiveYear('')
      setGiveISBN('')
      setErrors([])
      setStep(4)
    } catch (error) {
      console.error('Ошибка при создании книги:', error)
      setErrors([error.message])
    }
  }
  const handleBookBack = () => {
    setGiveTitle('')
    setGiveAuthor('')
    setGiveYear('')
    setGiveISBN('')
    setErrors([])
    setStep(1)
  }

  // ---------------- Шаг 3: Выбор жанров ----------------
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
  const handleGenreNext = () => {
    if (selectedGenres.length === 0) {
      setErrors(['Пожалуйста, выберите хотя бы один жанр.'])
      return
    }
    setErrors([])
    setStep(4)
  }
  const handleBack = () => {
    setErrors([])
    if (step === 3) {
      setSelectedGenres([])
      setSearchQuery('')
      setSelectAll(false)
      setStep(1)
    } else if (step === 4) {
      setStep(3)
    }
  }

  // ---------------- Шаг 4: Подтверждение обмена ----------------
  const handleConfirmExchange = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

      // Создаём offers для каждой сохранённой книги
      for (const book of savedBooks) {
        const offerPayload = {
          bookLiteraryId: book.bookId,
          isbn: book.isbn,
          yearPublishing: new Date(parseInt(book.year, 10), 0, 1).toISOString(),
          status: 'ACTIVE',
          categoryIds: mapGenresToIds(selectedGenres)
        }
        await axios.post('http://localhost:1934/offers', offerPayload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      // Формируем объект для wish
      const wishPayload = {
        status: 'active',
        createAt: now,
        updateAt: now,
        categoryIds: mapGenresToIds(selectedGenres)
      }
      await axios.post('http://localhost:1934/wishes/v2', wishPayload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert('Обмен успешно подтвержден и данные отправлены на сервер!')

      setSavedBooks([])
      setSelectedGenres([])
      setStep(1)
    } catch (error) {
      console.error('Ошибка при подтверждении обмена:', error)
      setErrors([error.message])
    }
  }

  // ---------------- RENDER ----------------
  return (
    <div className="profile-page page-fade-in">
      <h2>Обмен книгами</h2>

      {step === 1 && (
        <div className="step-content">
          <h3>Выберите действие</h3>
          <table className="exchange-table">
            <thead>
              <tr>
                <th style={{ width: '50%', border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}>
                  <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Что у вас есть на обмен
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={{ width: '90%', marginBottom: '10px' }}
                  >
                    Добавить книгу
                  </button>
                  {savedBooks.length === 0 ? (
                    <p>Нет добавленных книг</p>
                  ) : (
                    savedBooks.map((book, index) => {
                      const bgColor = index % 2 === 0 ? '#f7f7f7' : '#ededed'
                      return (
                        <div
                          key={index}
                          style={{
                            marginBottom: '5px',
                            padding: '5px',
                            backgroundColor: bgColor
                          }}
                        >
                          {book.title} ({book.year})
                          {book.isbn ? ` (ISBN: ${book.isbn})` : ''}
                        </div>
                      )
                    })
                  )}
                </th>
                <th style={{ width: '50%', border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}>
                  <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Что вы хотите получить
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    style={{ width: '90%', marginBottom: '10px' }}
                  >
                    Выбрать жанры
                  </button>
                  {wishes.length === 0 ? (
                    <p>Нет сохраненных wishes</p>
                  ) : (
                    wishes.map((wish, index) => {
                      const bgColor = index % 2 === 0 ? '#f7f7f7' : '#ededed'
                      return (
                        <div
                          key={wish.id || index}
                          style={{
                            marginBottom: '5px',
                            padding: '5px',
                            backgroundColor: bgColor
                          }}
                        >
                          <div>Статус: {wish.status}</div>
                          <div>Создано: {wish.createAt}</div>
                          <div>Обновлено: {wish.updateAt}</div>
                          <div>
                            Жанры:{' '}
                            {wish.categoryIds
                              .map((id) =>
                                Object.keys(genreMapping).find(
                                  (genreName) => genreMapping[genreName] === id
                                )
                              )
                              .join(', ')}
                          </div>
                        </div>
                      )
                    })
                  )}
                </th>
              </tr>
            </thead>
          </table>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handleConfirmExchange}>Подтвердить обмен</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h3>Этап 1: Добавить автора</h3>
          <div className="form-group">
            <h3>Введите данные об авторе</h3><br></br>
            <label>Имя и фамилия через пробел:</label>
            <input
              type="text"
              value={giveAuthor}
              onChange={(e) => setGiveAuthor(e.target.value)}
              placeholder="Например, Михаил Булгаков"
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            /> 
                     
          </div>
          <div
            className="step-navigation"
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              justifyContent: 'flex-end'
            }}
          >
            <button onClick={handleBookBack}>Назад</button>
            <button onClick={handleBookNext1}>Далее</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-content">
          <h3>Этап 2: Добавить книгу</h3>
          <h3>Введите данные о книге</h3>
          <div className="form-group">
            <label>Название книги:</label>
            <input
              type="text"
              value={giveTitle}
              onChange={(e) => setGiveTitle(e.target.value)}
              placeholder="Например, Мастер и Маргарита"
            />
          </div>
          
          <div className="form-group">
            <label>Год издания:</label>
            <input
              type="text"
              value={giveYear}
              onChange={(e) => setGiveYear(e.target.value)}
              placeholder="Например, 1967"
              pattern="^[0-9]+$"
              title="Только цифры"
              onKeyDown={onlyDigits}
            />
          </div>
          <div className="form-group">
            <label>ISBN (при наличии):</label>
            <input
              type="text"
              value={giveISBN}
              onChange={(e) => setGiveISBN(e.target.value)}
              placeholder="Например, 9783161484100"
              pattern="^([0-9]{10,13})?$"
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
              justifyContent: 'flex-end'
            }}
          >
            <button onClick={handleBookBack}>Назад</button>
            <button onClick={handleBookNext2}>Далее</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="step-content">
          <h3>Скрин 3: Выбор жанров</h3>
          <p>Отметьте жанры, которые вы хотите получить:</p>
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
              />{' '}
              Выбрать все
            </label>
          </div>
          <div
            style={{
              maxHeight: '150px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px'
            }}
          >
            {filteredGenres.map((genre) => (
              <div key={genre} style={{ marginBottom: '5px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) =>
                      handleGenreChange(e.target.checked, genre)
                    }
                  />{' '}
                  {genre}
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
              justifyContent: 'flex-start'
            }}
          >
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleGenreNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="step-content">
          <h3>Скрин 4: Подтверждение выбора</h3>
          <p>Вы выбрали следующие жанры:</p>
          <ul style={{ marginBottom: '20px' }}>
            {selectedGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <div>
            <button onClick={handleBack} style={{ marginRight: '10px' }}>
              Назад
            </button>
            <button onClick={handleConfirmExchange}>
              Подтвердить обмен
            </button>
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
