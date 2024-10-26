//Проверяют редьюсер слайса constructor setConstructorItems:
//обработку экшена добавления ингредиента addIngredient;
//обработку экшена удаления ингредиента removeIngredient;
//обработку экшена изменения порядка ингредиентов в начинке moveIngredient

import {
  setConstructorItems,
  addIngredient,
  removeIngredient,
  moveIngredient,
  TBurgerConstructorState,
  burgerConstructorReducer
} from '../burgerConstructorSlice';

import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid')
}));

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const mockMainIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'mocked-uuid'
};
const mockSauseIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'mocked-uuid'
};

describe('тесты burgerConstructor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Обработка экшена добавления ингредиента', () => {
    const currentState = burgerConstructorReducer(
      initialState,
      addIngredient(mockMainIngredient)
    );
    expect(currentState.constructorItems.ingredients[0]).toEqual({
      ...mockMainIngredient
    });
  });

  it('Обработка экшена удаления ингредиента', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [mockMainIngredient]
      }
    };
    const currentState = burgerConstructorReducer(
      initialState,
      removeIngredient(mockMainIngredient.id)
    );
    expect(currentState.constructorItems.ingredients).toEqual([]);
  });
  it('Обработка экшена изменения порядка ингредиентов в начинке', () => {
    const initialState: TBurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: '643d69a5c3f7b9001cfa0941' },
          { ...mockSauseIngredient, id: '643d69a5c3f7b9001cfa0942' }
        ]
      }
    };
    const currentState = burgerConstructorReducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(currentState).toEqual({
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockSauseIngredient, id: '643d69a5c3f7b9001cfa0942' },
          { ...mockMainIngredient, id: '643d69a5c3f7b9001cfa0941' }
        ]
      }
    });
  });
});
