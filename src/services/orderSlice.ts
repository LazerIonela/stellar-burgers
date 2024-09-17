import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData, TOrderStatus } from '@utils-types';
import {
  getOrderByNumberApi,
  orderBurgerApi,
  TOrdersResponse,
  TNewOrderResponse
} from '../utils/burger-api';
import { RootState } from './store';

//Отправляем заказ на готовку
export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (_id: string[]) => orderBurgerApi(_id)
);

//Получаем информармацию о заказе по номеру
const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number); // Ждём результат
    return response; // Возвращаем результат
  }
);

interface TOrderState {
  order: TOrder[];
  selectedOrder: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: TOrderState = {
  order: [],
  selectedOrder: null,
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    setOrderRequest(state, action) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        console.error('Error:', action.error.message);
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order.push(action.payload.order);
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        console.error('Error:', action.error.message);
      });
  }
});

export const { clearOrderModalData, setOrderModalData, setOrderRequest } =
  orderSlice.actions;
export const selectOrderByNumber = (state: RootState) =>
  state.order.selectedOrder;
export const selectOrderBurger = (state: RootState) => state.order.order;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const orderReducer = orderSlice.reducer;
