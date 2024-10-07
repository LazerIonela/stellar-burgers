import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api';
import { RootState } from './store';

//Получаем общедоступную ленту заказов для всех пользователей
export const getFeeds = createAsyncThunk('feeds/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

interface TFeedsState {
  orders: TOrdersData;
}

const initialState: TFeedsState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.rejected, (state, action) => {
        console.error('Error:', action.error.message);
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders.orders = action.payload.orders;
        state.orders.total = action.payload.total;
        state.orders.totalToday = action.payload.totalToday;
      });
  }
});

export const selectOrders = (state: RootState) => state.feeds.orders.orders;
export const selectFeeds = (state: RootState) => state.feeds;
export const selectOrdersTotal = (state: RootState) => state.feeds.orders.total;
export const selectOrdersTotalToday = (state: RootState) =>
  state.feeds.orders.totalToday;

export const feedsReducer = feedsSlice.reducer;
