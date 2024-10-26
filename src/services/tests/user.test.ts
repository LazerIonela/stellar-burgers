import {
  userReducer,
  getUser,
  updateUser,
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  TUserState,
  initialState
} from '../userSlice';

const mockUserData = {
  user: {
    email: 'test@example.com',
    name: 'Test User'
  },
  success: true
};

const mockLoginUser = {
  user: {
    email: 'test@example.com',
    name: 'Test User'
  },
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
  success: true
};

describe('тесты userSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('проверка getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUserData };
    const expectedState: TUserState = {
      ...initialState,
      userData: mockUserData.user,
      isAuth: true,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Error fetching user data' }
    };
    const expectedState: TUserState = {
      ...initialState,
      isAuth: false,
      isAuthChecked: true,
      error: 'Error fetching user data'
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUserData };
    const expectedState: TUserState = {
      ...initialState,
      userData: mockUserData.user,
      isAuth: true,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Registration error' }
    };
    const expectedState: TUserState = {
      ...initialState,
      error: 'Registration error'
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUserData };
    const expectedState: TUserState = {
      ...initialState,
      userData: mockUserData.user,
      isAuth: true,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Login error' }
    };
    const expectedState: TUserState = {
      ...initialState,
      error: 'Login error'
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка updateUser.fulfilled', () => {
    const updatedUserData = {
      user: {
        email: 'new@example.com',
        name: 'Updated User'
      }
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload: updatedUserData
    };
    const expectedState: TUserState = {
      ...initialState,
      userData: updatedUserData.user
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('проверка logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const expectedState: TUserState = {
      ...initialState,
      userData: null,
      isAuth: false,
      isAuthChecked: true
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
