import React, { useState, useEffect } from 'react'
import axios from 'axios'

function StartExchange() {
  // Этапы: 1 – Главное окно, 2 – Добавление автора, 3 – Добавление книги,
  //        4 – Выбор жанров, 5 – Подтверждение выбора
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])

  // Данные из полей (этап 2,3)
  const [giveTitle, setGiveTitle] = useState('')
  const [giveAuthor, setGiveAuthor] = useState('')
  const [giveYear, setGiveYear] = useState('')
  const [giveISBN, setGiveISBN] = useState('')

  // ID автора, возвращается при создании автора
  const [authorId, setAuthorId] = useState(null)

  // Сохранённые книги (с реальным bookId от сервера)
  const [savedBooks, setSavedBooks] = useState([])

  // Этап выбора жанров (этап 4)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])

  // Состояние для wishes (GET отключён)
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

  const mapGenresToIds = (genres) =>
    genres.map((g) => genreMapping[g]).filter((id) => id !== undefined)

  // ------ Валидация ввода -------
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

  // ------ Шаг 2: Добавление автора ------
  const handleBookNext1 = async () => {
    const newErrors = []
    if (!giveAuthor.trim()) newErrors.push('Укажите автора книги')

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const token = localStorage.getItem('token') || ''

      // Разбиваем ФИО
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

      // Создаём автора
      const authorRes = await axios.post(
        'http://localhost:1934/authors',
        authorPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const authorId = authorRes.data.idAuthor
      setAuthorId(authorId)

      // Сброс + переход
      setGiveAuthor('')
      setErrors([])
      setStep(3)
    } catch (error) {
      console.error('Ошибка при создании автора:', error)
      setErrors([error.message])
    }
  }

  // ------ Шаг 3: Добавление книги ------
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

      // Создаём книгу (связь с authorId)
      const bookPayload = {
        bookName: giveTitle,
        idAuthor: authorId
      }
      const bookRes = await axios.post(
        'http://localhost:1934/books',
        bookPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const bookId = bookRes.data.idBookLiterary

      // Сохранение данных на фронте
      setSavedBooks((prev) => [
        ...prev,
        {
          title: giveTitle,
          author: giveAuthor,
          year: giveYear,
          isbn: giveISBN,
          bookId: bookId
        }
      ])

      // Сброс + шаг 4
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

  // ------ Шаг 4: Выбор жанров ------
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
    if (step == 4) {
      setStep(5)
    } else if (step == 6) {
      setStep(7)
    }
  }

  const handleBack = () => {
    setErrors([])
    if (step === 4) {
      setSelectedGenres([])
      setSearchQuery('')
      setSelectAll(false)
      setStep(1)
    } else if (step === 5) {
      setStep(4)
    }
  }

  const handleBackWishes = () => {
    if (step == 6) {
      setErrors([])
      setSelectedGenres([])
      setSearchQuery('')
      setSelectAll(false)
      setStep(1)
    } else if (step == 7) {
      setStep(6)
    }
  }

// ------ Шаг 5: Подтверждение обмена ------
const handleConfirmExchange = async () => {
  try {
    const token = localStorage.getItem('token') || '';

    if (step === 5) {
      // Создание offer для каждой книги
      for (const book of savedBooks) {
        const offerPayload = {
          bookLiteraryId: book.bookId,
          isbn: book.isbn,
          yearPublishing: parseInt(book.year, 10), // int
          status: 'active',
          categoryIds: mapGenresToIds(selectedGenres)
        };
        await axios.post('http://localhost:1934/offers', offerPayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      alert('Книга сохранена и данные отправлены на сервер!');
      setSavedBooks([]);
      setSelectedGenres([]);
      setStep(1);
    } else if (step === 7) {
      // Создание wish
      const wishPayload = {
        status: 'active',
        categoryIds: mapGenresToIds(selectedGenres)
      };
      await axios.post('http://localhost:1934/wishes/v2', wishPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // После POST запроса отправляем GET запрос для получения обменов
      const matchesResponse = await axios.get('http://localhost:1934/exchange/matches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Полученные совпадения обменов:', matchesResponse.data);
      alert('Желание подтверждено и данные отправлены на сервер!');
      setSelectedGenres([]);
      setStep(1);
    }
  } catch (error) {
    console.error('Ошибка при подтверждении обмена:', error);
    setErrors([error.message]);
  }
};

  // ------ Отрисовка ------
  return (
    <div className="profile-page page-fade-in">
      <h2>Обмен книгами</h2>

      {step === 1 && (
        <div className="step-content">
          <h3>Выберите действие</h3>
          <table className="exchange-table" st>
            <thead>
              <tr>
                <th
                  style={{
                    width: '50%',
                    border: 'none',
                    textAlign: 'center',
                    padding: '10px'
                  }}
                >
                  <button
                    onClick={() => setStep(2)}
                    style={{ width: '90%', marginBottom: '10px' }}
                  >
                    Добавить книгу для обмена
                  </button>

                </th>
                <th
                  style={{
                    width: '50%',
                    border: 'none',
                    textAlign: 'center',
                    padding: '10px'
                  }}
                >
                  <button
                    onClick={() => setStep(6)}
                    style={{ width: '90%', marginBottom: '10px' }}
                  >
                    Получение желаемой книги
                  </button>

                </th>
              </tr>
            </thead>
          </table>

        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h3>Этап 1: Добавить автора</h3>
          <div className="form-group">
            <h3>Введите данные об авторе</h3>
            <br />
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
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px'
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
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <button onClick={handleBookBack}>Назад</button>
            <button onClick={handleBookNext2}>Добавить книгу</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="step-content">
          <h3>Этап 3: Выбор жанров</h3>
          <p>Отметьте жанры, к которым относится ваша книга:</p>
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
                    onChange={(e) => handleGenreChange(e.target.checked, genre)}
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
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleGenreNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="step-content">
          <h3>Этап 4: Подтверждение выбора</h3>
          <p>Вы выбрали следующие жанры:</p>
          <ul style={{ marginBottom: '20px', listStyleType: 'none' }}>
            {selectedGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <div>
            <button onClick={handleBack} style={{ marginRight: '10px' }}>
              Назад
            </button>
            <button onClick={handleConfirmExchange}>Подтвердить добавление книги</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="step-content">
          <h3>Этап 1: Выбор жанров</h3>
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
                    onChange={(e) => handleGenreChange(e.target.checked, genre)}
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
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <button onClick={handleBackWishes}>Назад</button>
            <button onClick={handleGenreNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="step-content">
          <h3>Этап 2: Подтверждение выбора</h3>
          <p>Вы выбрали следующие жанры:</p>
          <ul style={{ marginBottom: '20px', listStyleType: 'none' }}>
            {selectedGenres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <div>
            <button onClick={handleBackWishes} style={{ marginRight: '10px' }}>
              Назад
            </button>
            <button onClick={handleConfirmExchange}>Подтвердить желание</button> 
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
