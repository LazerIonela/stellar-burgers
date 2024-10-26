//
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../userSlice';
import { ingredientsReducer } from '../ingredientsSlice';
import { orderReducer } from '../orderSlice';
import { feedsReducer } from '../feedsSlice';
import { burgerConstructorReducer } from '../burgerConstructorSlice';
import { profileOrdersReducer } from '../profileOrdersSlice';

describe('Проверка правильной инициализации rootReducer', () => {
  it('rootReducer', () => {
    const rootReducer = combineReducers({
      user: userReducer,
      ingredients: ingredientsReducer,
      order: orderReducer,
      feeds: feedsReducer,
      burgerConstructor: burgerConstructorReducer,
      profileOrders: profileOrdersReducer
    });
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);

    expect(state).toEqual({
      user: userReducer(undefined, testAction),
      ingredients: ingredientsReducer(undefined, testAction),
      order: orderReducer(undefined, testAction),
      feeds: feedsReducer(undefined, testAction),
      burgerConstructor: burgerConstructorReducer(undefined, testAction),
      profileOrders: profileOrdersReducer(undefined, testAction)
    });
  });
});
