import {
  orderReducer,
  orderBurger,
  getOrderByNumber,
  TOrderState,
  setOrderModalData,
  resetOrderModalData
} from '../orderSlice';

const mockOrder = {
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
};

const initialState = {
  order: [],
  selectedOrder: null,
  orderRequest: false,
  orderModalData: null
};

describe('тесты orders', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен установить orderRequest в true при вызове orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  it('должен добавить order и установить orderRequest в false при вызове orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: [mockOrder],
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  it('должен установить orderRequest в false при вызове orderBurger.rejected', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false
    });
  });

  it('должен установить selectedOrder при вызове getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectedOrder: mockOrder
    });
  });

  it('должен обработать ошибку при вызове getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка при получении заказа' }
    };
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectedOrder: null
    });
    expect(consoleSpy).toHaveBeenCalledWith('Error:', action.error.message);
    consoleSpy.mockRestore();
  });
});
