import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData, TOrderStatus, TOrder } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api';
import { RootState } from './store';

//Получаем общедоступную ленту заказов для всех пользователей
export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  async () => await getFeedsApi()
);

interface TFeedsState {
  orders: TOrdersData;
  status: TOrderStatus;
}

const initialState: TFeedsState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: 'failed'
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    updateFeeds: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error:', action.error.message);
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.status = 'done';
          state.orders.orders = action.payload.orders;
          state.orders.total = action.payload.total;
          state.orders.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const selectOrders = (state: RootState) => state.feeds.orders.orders;
export const selectOrdersTotal = (state: RootState) => state.feeds.orders.total;
export const selectOrdersTotalToday = (state: RootState) =>
  state.feeds.orders.totalToday;

export const feedsReducer = feedsSlice.reducer;
