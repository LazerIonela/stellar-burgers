import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  updateUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData,
  TLoginData
} from '../utils/burger-api';
import { RootState } from './store';
import { setCookie } from '../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  console.log('getUser called');
  const response = await getUserApi();
  return response;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TUser) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  return response;
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

interface InitialState {
  userData: TUser | null;
  isAuth: boolean;
  error: string | undefined;
  isAuthChecked: boolean;
}

const initialState: InitialState = {
  userData: null,
  isAuth: false,
  error: undefined,
  isAuthChecked: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.user?.email && action.payload.user?.name) {
          state.userData = action.payload.user;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.userData;
export const selectUserIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const userReducer = userSlice.reducer;
