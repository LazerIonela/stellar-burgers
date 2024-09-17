import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../utils/burger-api';
import { RootState } from './store';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

interface TIngredientState {
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
}

const initialState: TIngredientState = {
  ingredients: [],
  selectedIngredient: null,
  isLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Error:', action.error.message);
      });
  }
});

export const { setSelectedIngredient } = ingredientsSlice.actions;
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredient = (state: RootState) =>
  state.ingredients.selectedIngredient;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const ingredientsReducer = ingredientsSlice.reducer;
