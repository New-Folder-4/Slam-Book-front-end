import React, { useState } from 'react'

function MyExchanges() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingStatus, setTrackingStatus] = useState('')
  const [receiptMessage, setReceiptMessage] = useState('')

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
        <h3>Отправка книги</h3>
        <div className="form-group">
          <label>Трек-номер:</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трек-номер"
          />
        </div>
        <button onClick={submitTracking}>Отправить трек-номер</button>
        {trackingStatus && <p>{trackingStatus}</p>}
      </div>

      <div className="sub-block">
        <h3>Подтверждение получения книги</h3>
        <button onClick={confirmReceipt}>Подтвердить получение</button>
        {receiptMessage && <p>{receiptMessage}</p>}
      </div>
    </div>
  )
}

export default MyExchanges
