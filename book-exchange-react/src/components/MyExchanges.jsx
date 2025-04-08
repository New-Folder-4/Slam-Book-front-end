import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MyExchanges() {
  const [offers, setOffers] = useState([])
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Мои обмены'
    const token = localStorage.getItem('token') // Токен пользователя

    async function fetchData() {
      try {
        setLoading(true)
        setError('')

        // Получаем предложения (Offers) текущего пользователя
        const offersRes = await axios.get('http://localhost:1934/offers/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOffers(offersRes.data || [])

        // Получаем желания (Wishes) текущего пользователя
        const wishesRes = await axios.get('http://localhost:1934/wishes/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setWishes(wishesRes.data || [])
      } catch (err) {
        console.error(err)
        setError('Ошибка при загрузке данных.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p>Загрузка...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <div className="profile-page page-fade-in">
      <h2>Мои обмены</h2>

      <div className="sub-block">
        <h3>Мои предложения (Offers)</h3>
        {offers.length === 0 ? (
          <p>Нет созданных предложений</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f1f1f1' }}>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID Offer</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ISBN</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Год публикации</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.idOfferList}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {offer.idOfferList}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {offer.isbn || '—'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {offer.yearPublishing ? offer.yearPublishing.split('T')[0] : '—'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {offer.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="sub-block">
        <h3>Мои желания (Wishes)</h3>
        {wishes.length === 0 ? (
          <p>Нет созданных желаний</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f1f1f1' }}>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID Wish</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Категории</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {wishes.map((wish) => (
                <tr key={wish.idWishList}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {wish.idWishList}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {wish.categoryIds ? wish.categoryIds.join(', ') : '—'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {wish.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default MyExchanges
