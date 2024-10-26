import {
  profileOrdersReducer,
  getOrders,
  TProfileOrdersState
} from '../profileOrdersSlice';

const mockOrders = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Тестовый заказ1',
      createdAt: '2024-10-25T21:25:55.614Z',
      updatedAt: '2024-10-25T21:25:56.549Z',
      number: 57630,
      ingredients: [
        'mockBunIngredient',
        'MockMainIngredient',
        'mockSauceIngredient'
      ]
    },
    {
      _id: '2',
      status: 'done',
      name: 'Тестовый заказ2',
      createdAt: '2024-10-25T20:44:28.275Z',
      updatedAt: '2024-10-25T20:44:29.995Z',
      number: 57628,
      ingredients: ['mockBunIngredient', 'MockMainIngredient']
    }
  ]
};
const initialState: TProfileOrdersState = {
  orders: []
};

describe('тесты profileOrders', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка успешного запроса getOrders', () => {
    const currentState = profileOrdersReducer(
      { ...initialState },
      getOrders.fulfilled(mockOrders.orders, 'fulfilled', undefined)
    );
    expect(currentState.orders).toEqual(mockOrders.orders);
  });

  it('Проверка обработки ошибки', () => {
    const action = getOrders.rejected(new Error('Ошибка'), '', undefined);
    const currentState = profileOrdersReducer({ ...initialState }, action);
    expect(currentState.orders).toEqual(initialState.orders);
  });
});
