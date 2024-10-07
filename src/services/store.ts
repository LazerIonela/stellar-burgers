import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { ingredientsReducer } from './ingredientsSlice';
import { orderReducer } from './orderSlice';
import { feedsReducer } from './feedsSlice';
import { burgerConstructorReducer } from './burgerConstructorSlice';
import { profileOrdersReducer } from './profileOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feeds: feedsReducer,
  burgerConstructor: burgerConstructorReducer,
  profileOrders: profileOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
