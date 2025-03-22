import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function EditAddress() {
  const [addrIndex, setAddrIndex] = useState('')
  const [addrCity, setAddrCity] = useState('')
  const [addrStreet, setAddrStreet] = useState('')
  const [addrHouse, setAddrHouse] = useState('')
  const [addrStructure, setAddrStructure] = useState('')
  const [addrApart, setAddrApart] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Изменить адрес доставки'
    const storedIndex = localStorage.getItem('addrIndex') || ''
    const storedCity = localStorage.getItem('addrCity') || ''
    const storedStreet = localStorage.getItem('addrStreet') || ''
    const storedHouse = localStorage.getItem('addrHouse') || ''
    const storedStruct = localStorage.getItem('addrStructure') || ''
    const storedApart = localStorage.getItem('addrApart') || ''

    setAddrIndex(storedIndex)
    setAddrCity(storedCity)
    setAddrStreet(storedStreet)
    setAddrHouse(storedHouse)
    setAddrStructure(storedStruct)
    setAddrApart(storedApart)
  }, [])

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

  const handleCancel = () => {
    navigate('/profile')
  }

  const handleSave = () => {
    localStorage.setItem('addrIndex', addrIndex)
    localStorage.setItem('addrCity', addrCity)
    localStorage.setItem('addrStreet', addrStreet)
    localStorage.setItem('addrHouse', addrHouse)
    localStorage.setItem('addrStructure', addrStructure)
    localStorage.setItem('addrApart', addrApart)

    setMessage('Адрес сохранён!')
    setTimeout(() => navigate('/profile'), 1000)
  }

  return (
    <div className="profile-page page-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <h2>Изменить адрес доставки</h2>
      <div className="form-fields" style={{ marginTop: '20px' }}>
        <div className="form-group">
          <label>Индекс*:</label>
          <input
            type="text"
            value={addrIndex}
            onChange={(e) => setAddrIndex(e.target.value)}
            placeholder="6 цифр"
            maxLength={6}
            pattern="^[0-9]+$"
            title="Только цифры (6 символов)"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Город*:</label>
          <input
            type="text"
            value={addrCity}
            onChange={(e) => setAddrCity(e.target.value)}
            placeholder="Город"
            maxLength={15}
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Улица*:</label>
          <input
            type="text"
            value={addrStreet}
            onChange={(e) => setAddrStreet(e.target.value)}
            placeholder="Улица"
            maxLength={25}
            pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
            title="Только буквы, пробелы и дефисы"
            onKeyDown={onlyLetters}
          />
        </div>
        <div className="form-group">
          <label>Номер дома*:</label>
          <input
            type="text"
            value={addrHouse}
            onChange={(e) => setAddrHouse(e.target.value)}
            placeholder="Номер дома"
            maxLength={5}
            pattern="^[0-9]+$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Номер строения:</label>
          <input
            type="text"
            value={addrStructure}
            onChange={(e) => setAddrStructure(e.target.value)}
            placeholder="Номер строения"
            maxLength={2}
            pattern="^[0-9]*$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
        <div className="form-group">
          <label>Номер квартиры:</label>
          <input
            type="text"
            value={addrApart}
            onChange={(e) => setAddrApart(e.target.value)}
            placeholder="Номер квартиры"
            maxLength={3}
            pattern="^[0-9]*$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleCancel}>Отмена</button>
        <button onClick={handleSave}>Сохранить</button>
      </div>
      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
    </div>
  )
}

export default EditAddress
