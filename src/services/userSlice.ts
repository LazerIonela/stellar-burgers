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

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData, p0) => await updateUserApi(user, p0)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

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
  user: TUser;
  isAuth: boolean;
  error: string | undefined;
  isAuthChecked: boolean;
}

const initialState: InitialState = {
  user: {
    email: '',
    name: ''
  },
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
        state.user = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          email: '',
          name: ''
        };
        state.isAuth = false;
      });
  }
});

// export const { addBook, removeBook } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const userReducer = userSlice.reducer;
