import React, { useState, useEffect } from 'react'

function MyExchanges() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingStatus, setTrackingStatus] = useState('')
  const [receiptMessage, setReceiptMessage] = useState('')
  const [exchanges, setExchanges] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Мои обмены'
    const savedExchanges = JSON.parse(localStorage.getItem('exchanges') || '[]')
    setExchanges(savedExchanges)
  }, [])

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

  const submitTracking = () => {
    if (trackingNumber.trim() !== '') {
      setTrackingStatus(`Трек-номер ${trackingNumber} отправлен. Ожидайте обновления.`)
    }
  }

  const confirmReceipt = () => {
    setReceiptMessage('Получение книги подтверждено!')
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Мои обмены</h2>
      <p>Здесь отображаются активные и завершённые обмены (демо).</p>

      <div className="sub-block">
        <h3>Мои созданные заявки</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по трек-номеру"
            style={{ width: '90%', padding: '8px' }}
          />
        </div>
        {exchanges.length === 0 ? (
          <p>Нет созданных заявок</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f1f1f1' }}>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Трек-номер</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Книга</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Жанр</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Дата создания</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map((ex, index) => {
                const highlightStyle =
                  searchQuery && ex.trackNumber.includes(searchQuery)
                    ? { backgroundColor: '#ffff99' }
                    : {}
                return (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc', padding: '8px', ...highlightStyle }}>
                      {ex.trackNumber}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {ex.book}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {ex.genre}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {new Date(ex.date).toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="sub-block">
        <h3>Отправка книги</h3><br />
        <div className="form-group">
          <label>Трек-номер:</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трек-номер"
            pattern="^[0-9]+$"
            title="Только цифры"
            onKeyDown={onlyDigits}
          />
        </div>
        <button onClick={submitTracking}>Отправить трек-номер</button>
        {trackingStatus && <p>{trackingStatus}</p>}
      </div>

      <div className="sub-block">
        <h3>Подтверждение получения книги</h3><br />
        <button onClick={confirmReceipt}>Подтвердить получение</button>
        {receiptMessage && <p>{receiptMessage}</p>}
      </div>
    </div>
  )
}

export default MyExchanges
