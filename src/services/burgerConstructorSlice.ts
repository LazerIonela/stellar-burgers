import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';

interface TBurgerConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems(state, action) {
      state.constructorItems = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      //prepare позволяет добавить дополнительные данные,
      prepare: (ingredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      // Извлекаем ингредиент, который нужно переместить
      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      // Вставляем его на новую позицию
      ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearBasket: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
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

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.constructorItems.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.constructorItems.ingredients;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
