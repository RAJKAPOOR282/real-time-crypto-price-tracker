import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptos = createAsyncThunk('crypto/fetchCryptos', async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,24h,7d');
  return response.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
