import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../utils/burger-api';
import { RootState } from './store';
//запрос ленты заказов пользователя
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

interface TProfileOrdersState {
  orders: TOrder[];
}

const initialState: TProfileOrdersState = {
  orders: []
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.rejected, (state, action) => {
        console.error('Error:', action.error.message);
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
        }
      );
  }
});

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const profileOrdersReducer = profileOrdersSlice.reducer;
