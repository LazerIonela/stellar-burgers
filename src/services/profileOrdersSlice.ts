import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrderStatus, TOrder } from '@utils-types';
import { getOrdersApi } from '../utils/burger-api';
import { RootState } from './store';

const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

interface TProfileOrdersState {
  orders: TOrder[];
  status: TOrderStatus;
}

const initialState: TProfileOrdersState = {
  orders: [],
  status: 'failed'
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error:', action.error.message);
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.status = 'done';
          state.orders = action.payload;
        }
      );
  }
});

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersStatus = (state: RootState) =>
  state.profileOrders.status;
export const profileOrdersReducer = profileOrdersSlice.reducer;
