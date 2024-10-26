import { feedsReducer, initialState, getFeeds } from '../feedsSlice';

const mockFeeds = {
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
  ],
  total: 57256,
  totalToday: 155,
  success: true
};

describe('тесты feeds', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка обновления статуса заказа, общего кол-ва заказов за день и за все время при успешном запросе getFeeds', () => {
    const currentState = feedsReducer(
      { ...initialState },
      getFeeds.fulfilled(mockFeeds, 'fulfilled', undefined)
    );
    expect(currentState.orders.orders).toEqual(mockFeeds.orders);
    expect(currentState.orders.total).toBe(mockFeeds.total);
    expect(currentState.orders.totalToday).toBe(mockFeeds.totalToday);
  });

  it('Проверка обработки ошибки', () => {
    const action = getFeeds.rejected(new Error('Ошибка'), '', undefined);
    const currentState = feedsReducer({ ...initialState }, action);
    expect(currentState.orders).toEqual(initialState.orders);
  });
});
