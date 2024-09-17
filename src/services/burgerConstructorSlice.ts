import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../utils/burger-api';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';

interface TBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      //prepare позволяет добавить дополнительные данные,
      prepare: (ingredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.ingredients;
      // Извлекаем ингредиент, который нужно переместить
      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      // Вставляем его на новую позицию
      ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearBasket: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setConstructorItems,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearBasket
} = burgerConstructorSlice.actions;
export const selectConstructor = (state: RootState) => state.constructor;
export const selectConstructorBun = (state: RootState) => state.constructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.constructor.ingredients;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
