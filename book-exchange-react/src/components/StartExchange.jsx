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

  const [selectedRegion, setSelectedRegion] = useState('');
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')

  const regions = {
    'Московская обл.': ['Москва', 'Подольск', 'Химки', 'Балашиха', 'Королёв', 'Мытищи', 'Люберцы', 'Красногорск'],
    'Ленинградская обл.': ['Санкт-Петербург', 'Мурино', 'Гатчина', 'Всеволожск', 'Выборг', 'Сосновый Бор', 'Кириши'],
    'Самарская область': ['Самара', 'Тольятти', 'Сызрань', 'Новокуйбышевск', 'Чапаевск', 'Жигулёвск', 'Кинель', 'Отрадный'],
    'Респ. Адыгея': ['Майкоп', 'Адыгейск', 'Яблоновский'],
    'Репс. Алтай': ['Горно-Алтайск', 'Майма', 'Чемал'],
    'Респ. Башкартостан': ['Уфа', 'Стерлитамак', 'Салават', 'Нефтекамск', 'Октябрьский'],
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
};


  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setCity(''); // Сброс выбранного города при изменении региона
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

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
    const newErrors = [];
    if (step === 1) {
      if (!giveTitle.trim()) newErrors.push('Укажите название книги');
      if (!giveAuthor.trim()) newErrors.push('Укажите автора книги');
      if (!giveYear.trim()) {
        newErrors.push('Укажите год издания');
      } else {
        const yearNum = parseInt(giveYear, 10);
        if (yearNum >= 2026) newErrors.push('Неверный год издания');
      }
      if (giveISBN && (giveISBN.length < 10 || giveISBN.length > 13)) {
        newErrors.push('Неверный ISBN');
      }
      if (newErrors.length === 0) {
        setErrors([]);
        setStep(2);
        return;
      }
    }
    if (step === 2) {
      if (selectedGenres.length === 0) {
        newErrors.push('Пожалуйста, выберите хотя бы один жанр.');
      }
      if (newErrors.length === 0) {
        setErrors([]);
        setStep(3);
        return;
      }
    }
    setErrors(newErrors);
  };
  

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
              //style={{ width: '90%' }}
              type="text"
              value={giveTitle}
              onChange={(e) => setGiveTitle(e.target.value)}
              placeholder="Мастер и Маргарита"
            />
          </div>
          <div className="form-group">
            <label>Автор:</label>
            <input
              //style={{ width: '90%' }}
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
              //style={{ width: '90%' }}
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
              justifyContent: 'flex-end',
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
          <div style={{ marginBottom: '10px'}}>
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
              style={{ width: '90%'}}
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
              <div key={genre} style={{ marginBottom: '5px'}}>
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
            <label>Регион:</label>
            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              style={{ width: '90%' }}
            >
              <option value="">Выберите регион</option>
              {Object.keys(regions).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Город:</label>
            <select
              value={city}
              onChange={handleCityChange}
              style={{ width: '90%' }}
              disabled={!selectedRegion}
            >
              <option value="">Выберите город</option>
              {selectedRegion &&
                regions[selectedRegion].map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
            </select>
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
