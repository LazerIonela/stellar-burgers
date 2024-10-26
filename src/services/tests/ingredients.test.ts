import { getIngredients, ingredientsReducer } from '../ingredientsSlice';

const mockIngredients = [
  {
    _id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

const initialState = {
  ingredients: [],
  selectedIngredient: null,
  isLoading: false,
  error: null
};

describe('тесты ingredientdsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен установить isLoading в true при вызове getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('должен обновить ingredients и установить isLoading в false при вызове getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      isLoading: false
    });
  });

  it('должен установить error и установить isLoading в false при вызове getIngredients.rejected', () => {
    const error = 'Ошибка';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: error,
      isLoading: false
    });
  });
});
