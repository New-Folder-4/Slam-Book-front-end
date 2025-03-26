import React, { useState } from 'react'

function StartExchange() {
  // Управление переходами между экранами:
  // 1 – Главное окно (Скрин 1), 2 – Форма добавления книги (Скрин 2),
  // 3 – Выбор жанров (Скрин 3), 4 – Подтверждение выбора (Скрин 4)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])

  // Данные книги (используются на Скрин 2)
  const [giveTitle, setGiveTitle] = useState('')
  const [giveAuthor, setGiveAuthor] = useState('')
  const [giveYear, setGiveYear] = useState('')
  const [giveISBN, setGiveISBN] = useState('')

  // Данные для выбора жанров (на Скринах 3 и 4)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])

  // Список книг, добавленных пользователем (отображается на Скрине 1)
  const [userBooks, setUserBooks] = useState([])

  // Состояния для адреса (хоть сейчас и не используются, но оставлены для полноты)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')

  const regions = {
    'Московская обл.': ['Москва', 'Подольск', 'Химки', 'Балашиха', 'Королёв', 'Мытищи', 'Люберцы', 'Красногорск'],
    'Ленинградская обл.': ['Санкт-Петербург', 'Мурино', 'Гатчина', 'Всеволожск', 'Выборг', 'Сосновый Бор', 'Кириши'],
    'Самарская область': ['Самара', 'Тольятти', 'Сызрань', 'Новокуйбышевск', 'Чапаевск', 'Жигулёвск', 'Кинель', 'Отрадный'],
    'Респ. Адыгея': ['Майкоп', 'Адыгейск', 'Яблоновский'],
    'Репс. Алтай': ['Горно-Алтайск', 'Майма', 'Чемал'],
    'Респ. Башкаростан': ['Уфа', 'Стерлитамак', 'Салават', 'Нефтекамск', 'Октябрьский'],
    'ДНР': ['Донецк', 'Макеевка', 'Горловка', 'Мариуполь'],
    'Респ. Ингушетия': ['Магас', 'Назрань', 'Карабулак'],
    'Кабардино-Балкарска Респ.': ['Нальчик', 'Баксан', 'Прохладный'],
    'Респ. Калмыкия': ['Элиста', 'Лагань', 'Городовиковск'],
    'Карачаево-Черкесская Респ.': ['Черкесск', 'Карачаевск', 'Усть-Джегута'],
    'Респ. Карелия': ['Петрозаводск', 'Кондопога', 'Сортавала'],
    'Респ. Коми': ['Сыктывкар', 'Ухта', 'Воркута'],
    'Респ. Крым': ['Симферополь', 'Севастополь', 'Керчь'],
    'ЛНР': ['Луганск', 'Алчевск', 'Стаханов'],
    'Респ. Марий Эл': ['Йошкар-Ола', 'Волжск', 'Козьмодемьянск'],
    'Респ. Мордовия': ['Саранск', 'Рузаевка', 'Ковылкино'],
    'Респ. Саха (Якутия)': ['Якутск', 'Нерюнгри', 'Мирный'],
    'Респ. Северная Осетия - Алания': ['Владикавказ', 'Моздок', 'Беслан'],
    'Респ. Татарстан': ['Казань', 'Набережные Челны', 'Нижнекамск'],
    'Респ. Тыва': ['Кызыл', 'Ак-Довурак', 'Чадан'],
    'Удмуртская Респ.': ['Ижевск', 'Сарапул', 'Воткинск'],
    'Респ. Хакасия': ['Абакан', 'Черногорск', 'Саяногорск'],
    'Чеченская Респ.': ['Грозный', 'Урус-Мартан', 'Шали'],
    'Чувашская Респ. - Чувашия': ['Чебоксары', 'Новочебоксарск', 'Канаш'],
    //Края
    'Алтайский край': ['Барнаул', 'Бийск', 'Рубцовск'],
    'Забайкальский край': ['Чита', 'Краснокаменск', 'Борзя'],
    'Камчатский край': ['Петропавловск-Камчатский', 'Елизово', 'Вилючинск'],
    'Краснодарский край': ['Краснодар', 'Сочи', 'Новороссийск'],
    'Красноярский край': ['Красноярск', 'Норильск', 'Ачинск'],
    'Пермский край': ['Пермь', 'Березники', 'Соликамск'],
    'Приморский край': ['Владивосток', 'Находка', 'Уссурийск'],
    'Ставропольский край': ['Ставрополь', 'Пятигорск', 'Кисловодск'],
    'Хабаровский край': ['Хабаровск', 'Комсомольск-на-Амуре', 'Амурск'],
    //области
    'Амурская обл.': ['Благовещенск', 'Белогорск', 'Свободный'],
    'Архангельская обл.': ['Архангельск', 'Северодвинск', 'Котлас'],
    'Астраханская обл.': ['Астрахань', 'Ахтубинск', 'Знаменск'],
    'Белгородская обл.': ['Белгород', 'Старый Оскол', 'Губкин'],
    'Брянская обл.': ['Брянск', 'Клинцы', 'Новозыбков'],
    'Владимирская обл.': ['Владимир', 'Коврово', 'Муром'],
    'Волгоградская обл.': ['Волгоград', 'Волжский', 'Камышин'],
    'Вологодская обл.': ['Вологда', 'Череповец', 'Сокол'],
    'Воронежская обл.': ['Воронеж', 'Борисоглебск', 'Россошь'],
    'Запорожская обл.': ['Мелитополь', 'Бердянск', 'Энергодар'],
    'Ивановская обл.': ['Иваново', 'Кинешма', 'Шуя'],
    'Иркутская обл': ['Иркутск', 'Ангарск', 'Братск'],
    'Калининградская обл.': ['Калининград', 'Советск', 'Черняховск'],
    'Калужская обл.': ['Калуга', 'Обнинск', 'Людиново'],
    'Кемеровская обл. - Кузбасс': ['Кемерово', 'Новокузнецк', 'Прокопьевск'],
    'Кировская обл.': ['Киров', 'Кирово-Чепецк', 'Вятские Поляны'],
    'Костромская обл.': ['Кострома', 'Буй', 'Шарья'],
    'Курганская обл.': ['Курган', 'Шадринск', 'Катайск'],
    'Курская обл.': ['Курск', 'Железногорск', 'Курчатов'],
    'Липецкая обл.': ['Липецк', 'Елец', 'Грязи'],
    'Магаданская обл.': ['Магадан', 'Сусуман', 'Усть-Омчуг'],
    'Мурманская обл.': ['Мурманск', 'Апатиты', 'Североморск'],
    'Нижегородская обл.': ['Нижний Новгород', 'Дзержинск', 'Арзамас'],
    'Новгородская обл.': ['Великий Новгород', 'Боровичи', 'Старая Русса'],
    'Омская обл.': ['Омск', 'Тара', 'Исилькуль'],
    'Оренбургская обл.': ['Оренбург', 'Орск', 'Новотроицк'],
    'Орловская обл.': ['Орёл', 'Ливны', 'Мценск'],
    'Пензенская обл.': ['Пенза', 'Кузнецк', 'Заречный'],
    'Псковская обл.': ['Псков', 'Великие Луки', 'Остров'],
    'Ростовская обл.': ['Ростов', 'Таганрог', 'Шахты'],
    'Рязанская обл.': ['Рязань', 'Касимов', 'Скопин'],
    'Саратовская обл.': ['Саратов', 'Энгельс', 'Балаково'],
    'Сахалинская обл.': ['Южно-Сахалинск', 'Корсаков', 'Холмск'],
    'Свердловская обл.': ['Екатеринбург', 'Нижний Тагил', 'Каменск-Уральский'],
    'Смоленская обл.': ['Смоленск', 'Рославль', 'Вязьма'],
    'Тамбовская обл.': ['Тамбов', 'Мичуринск', 'Рассказово'],
    'Тверская обл.': ['Тверь', 'Ржев', 'Вышний Волочёк'],
    'Томская обл.': ['Томск', 'Северск', 'Стрежевой'],
    'Тульская обл.': ['Тула', 'Новомосковск', 'Донской'],
    'Тюменская обл.': ['Тюмень', 'Тобольск', 'Ишим'],
    'Ульяновская обл.': ['Ульяновск', 'Димитровград', 'Инза'],
    'Херсонская обл.': ['Херсон', 'Новая Каховка', 'Каховка'],
    'Челябинская обл.': ['Челябинск', 'Магнитогорск', 'Златоуст'],
    'Ярославская обл.': ['Ярославль', 'Рыбинск', 'Переславль-Залесский'],
    //АО
    'Еврейская АО': ['Биробиджан', 'Облучье', 'Ленинское'],
    'Ненецкий АО': ['Нарьян-Мар', 'Искателей', 'Амдерма'],
    'Ханты-Мансийский АО - Югра': ['Ханты-Мансийск', 'Сургут', 'Нижневартовск'],
    'Чукотский АО': ['Анадырь', 'Эгвекинот', 'Билибино'],
    'Ямало-Ненецкий АО': ['Салехард', 'Новый Уренгой', 'Ноябрьск'],
  }

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value)
    setCity('')
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  // Массив всех жанров (сохранён полностью)
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

  // Обработчик для Скрина 2: добавление книги (валидация и переход на Скрин 1)
  const handleBookNext = () => {
    const newErrors = []
    if (!giveTitle.trim()) newErrors.push('Укажите название книги')
    if (!giveAuthor.trim()) newErrors.push('Укажите автора книги')
    if (!giveYear.trim()) {
      newErrors.push('Укажите год издания')
    } else {
      const yearNum = parseInt(giveYear, 10)
      if (yearNum >= 2026) newErrors.push('Неверный год издания')
    }
    if (giveISBN && (giveISBN.length < 10 || giveISBN.length > 13)) {
      newErrors.push('Неверный ISBN')
    }
    if (newErrors.length === 0) {
      // Добавляем книгу в список
      setUserBooks((prev) => [
        ...prev,
        { title: giveTitle, author: giveAuthor, year: giveYear, isbn: giveISBN }
      ])
      // Очищаем поля ввода
      setGiveTitle('')
      setGiveAuthor('')
      setGiveYear('')
      setGiveISBN('')
      setErrors([])
      // Возвращаемся на главный экран (Скрин 1)
      setStep(1)
    } else {
      setErrors(newErrors)
    }
  }

  // Новый обработчик для кнопки "Назад" на Скрине 2, чтобы изменения не сохранялись
  const handleBookBack = () => {
    setGiveTitle('')
    setGiveAuthor('')
    setGiveYear('')
    setGiveISBN('')
    setErrors([])
    setStep(1)
  }

  // Обработчик для Скрина 3: выбор жанров (валидация и переход на Скрин 4)
  const handleGenreNext = () => {
    const newErrors = []
    if (selectedGenres.length === 0) {
      newErrors.push('Пожалуйста, выберите хотя бы один жанр.')
    }
    if (newErrors.length === 0) {
      setErrors([])
      setStep(4)
    } else {
      setErrors(newErrors)
    }
  }

  // Кнопка "Назад":
  // Если на Скрине 3 – возвращаемся на главный экран (Скрин 1) и отменяем изменения
  // Если на Скрине 4 – возвращаемся к выбору жанров (Скрин 3)
  const handleBack = () => {
    setErrors([])
    if (step === 3) {
      // Отменяем выбор жанров
      setSelectedGenres([])
      setSearchQuery('')
      setSelectAll(false)
      setStep(1)
    } else if (step === 4) {
      setStep(3)
    }
  }

  // На Скрине 4 кнопка "Подтвердить обмен" возвращает нас на главный экран
  const handleConfirmExchange = () => {
    setErrors([])
    // Здесь можно добавить логику обмена, если потребуется
    setStep(1)
  }

  // Генерация трек-номера: 12-значное число, только цифры
  const generateTrackNumber = () => {
    let number = ''
    for (let i = 0; i < 12; i++) {
      number += Math.floor(Math.random() * 10)
    }
    return number
  }

  // Нажатие "Создать заявку" на Шаге 1
  // Генерируем трек-номер и сохраняем запись в localStorage (чтобы MyExchanges.jsx её прочитал)
  const handleCreateRequest = () => {
    // Проверим, есть ли хотя бы одна книга и один жанр
    if (userBooks.length === 0) {
      setErrors(['Сначала добавьте хотя бы одну книгу.'])
      return
    }
    if (selectedGenres.length === 0) {
      setErrors(['Сначала выберите хотя бы один жанр.'])
      return
    }
    // Если всё ок, генерируем трек-номер и сохраняем
    setErrors([])
    const trackNumber = generateTrackNumber()
    // Сохраняем в localStorage
    const newExchange = {
      trackNumber,
      // Для примера берём первую книгу и первый жанр (либо можно доработать логику выбора)
      book: userBooks[0]?.title || 'Не выбрано',
      genre: selectedGenres[0] || 'Не выбрано',
      date: new Date().toISOString()
    }
    let savedExchanges = JSON.parse(localStorage.getItem('exchanges') || '[]')
    savedExchanges.push(newExchange)
    localStorage.setItem('exchanges', JSON.stringify(savedExchanges))
    // Показываем трек-номер
    alert(`Заявка успешно создана!\nТрек номер: ${trackNumber}`)
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Обмен книгами</h2>

      {step === 1 && (
        <div className="step-content">
          <h3>Скрин 1: Выберите действие</h3>

          {/* Таблица фиксированной ширины, одинаковые колонки */}
          <table
            style={{
              width: '600px',
              margin: '0 auto',
              borderCollapse: 'collapse',
              tableLayout: 'fixed'
            }}
          >
            <thead>
              <tr>
                {/* Левая колонка: "Что у вас есть на обмен" + кнопка "Добавить" */}
                <th
                  style={{
                    width: '50%',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    padding: '10px'
                  }}
                >
                  <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Что у вас есть на обмен
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      width: '90%',
                      marginBottom: '10px'
                    }}
                  >
                    Добавить
                  </button>
                </th>
                {/* Правая колонка: "Что вы хотите получить" + кнопка "Выбрать" */}
                <th
                  style={{
                    width: '50%',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    padding: '10px'
                  }}
                >
                  <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Что вы хотите получить
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    style={{
                      width: '90%',
                      marginBottom: '10px'
                    }}
                  >
                    Выбрать
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Ячейка с книгами */}
                <td
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    verticalAlign: 'top'
                  }}
                >
                  {userBooks.map((book, index) => {
                    // чередование фона
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
                  })}
                </td>
                {/* Ячейка с выбранными жанрами */}
                <td
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    verticalAlign: 'top'
                  }}
                >
                  {selectedGenres.map((genre, index) => {
                    // чередование фона
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
                        {genre}
                      </div>
                    )
                  })}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Кнопка "Создать заявку" внизу */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={handleCreateRequest}>Создать заявку</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h3>Скрин 2: Добавить книгу</h3>
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
              pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
              title="Только буквы, пробелы и дефисы"
              onKeyDown={onlyLetters}
            />
          </div>
          <div className="form-group">
            <label>Год издания:</label>
            <input
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
              
              type="text"
              value={giveISBN}
              onChange={(e) => setGiveISBN(e.target.value)}
              placeholder="ISBN"
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
            <button onClick={handleBookNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 3 && (
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
              justifyContent: 'flex-start'
            }}
          >
            <button onClick={handleBack}>Назад</button>
            <button onClick={handleGenreNext}>Далее</button>
          </div>
        </div>
      )}

      {step === 4 && (
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

      {/* Выводим ошибки, если есть */}
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
