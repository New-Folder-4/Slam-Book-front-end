import React, { useState } from 'react'

function MyExchanges() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingStatus, setTrackingStatus] = useState('')
  const [receiptMessage, setReceiptMessage] = useState('')

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
        <h3>Отправка книги</h3> <br></br>
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
        <h3>Подтверждение получения книги</h3><br></br>
        <button onClick={confirmReceipt}>Подтвердить получение</button>
        {receiptMessage && <p>{receiptMessage}</p>}
      </div>
    </div>
  )
}

export default MyExchanges
