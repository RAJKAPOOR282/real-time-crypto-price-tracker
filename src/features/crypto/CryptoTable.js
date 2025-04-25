import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptos } from './cryptoSlice';

const getColor = (value) => (value >= 0 ? 'green' : 'red');

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { cryptos, status, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ overflowX: 'auto', padding: '24px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
        Top Cryptos
      </h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '18px',
          minWidth: '1200px',
        }}
      >
        <thead style={{ backgroundColor: '#f3f4f6' }}>
          <tr>
            {[
              '#',
              'Logo',
              'Name',
              'Symbol',
              'Price ($)',
              '1h %',
              '24h %',
              '7d %',
              'Market Cap',
              '24h Volume',
              'Supply',
            ].map((header) => (
              <th key={header} style={{ padding: '16px', border: '1px solid #ccc' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cryptos.slice(0, 10).map((crypto, index) => (
            <tr key={crypto.id} style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
              <td style={{ padding: '12px' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>
                <img
                  src={crypto.image.replace('/large/', '/small/')}
                  alt={crypto.name}
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
              </td>
              <td style={{ padding: '12px' }}>{crypto.name}</td>
              <td style={{ padding: '12px' }}>{crypto.symbol.toUpperCase()}</td>
              <td style={{ padding: '12px' }}>${crypto.current_price.toLocaleString()}</td>
              <td style={{ padding: '12px', color: getColor(crypto.price_change_percentage_1h_in_currency) }}>
                {crypto.price_change_percentage_1h_in_currency?.toFixed(2)}%
              </td>
              <td style={{ padding: '12px', color: getColor(crypto.price_change_percentage_24h) }}>
                {crypto.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td style={{ padding: '12px', color: getColor(crypto.price_change_percentage_7d_in_currency) }}>
                {crypto.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </td>
              <td style={{ padding: '12px' }}>${crypto.market_cap.toLocaleString()}</td>
              <td style={{ padding: '12px' }}>${crypto.total_volume.toLocaleString()}</td>
              <td style={{ padding: '12px' }}>{crypto.circulating_supply?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
