import { ValidationErrors } from './../models/notification';
import { authServices } from "./../services/auth";
import { UserInfo, LoginArgument} from "./../models/auth";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios";
import { handleError } from "./notification";

interface State {
  // token: string | null;
  userInfo?: UserInfo | undefined;
  isLoginLoading: boolean;
  checkAuthenticated?: boolean | undefined;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const initialState: State = {
  checkAuthenticated: undefined,
  userInfo: undefined,
  isLoginLoading: false,
};

const login = createAsyncThunk(
  `login`,
  async (args: LoginArgument, { dispatch }) => {
    try {
      const result = await authServices.login(args as LoginArgument);
      return result;
    } catch (error) {
      const err = error as AxiosError
      if(err.response){
        dispatch(handleError({ errorMessage: (err.response?.data as ValidationErrors).errorMessage }));
        throw err
      }
    }
  }
);

const setUserInfoCR: CR<{ token: string}> = (
  state,
  { payload }
) => ({
  ...state,
  userInfo: jwtDecode(payload.token!),
});

const storeTokenCR: CR<{value: boolean}> = (
  state,
  { payload }
) => ({
  ...state,
  checkAuthenticated: payload.value!
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: setUserInfoCR,
    storeToken: storeTokenCR
    // logout: state => {}
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      isLoginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if(payload?.token){
        console.log(payload.token)
        return{
          ...state,
          isLoginLoading: false,
          userInfo: jwtDecode(payload.token)
        }
      }
      return{
        ...state,
        isLoginLoading: false,
        userInfo: undefined
      }
    });
    builder.addCase(login.rejected, (state) => ({
      ...state,
      isLoginLoading: false,
    }));
  },
});

export { login };

export const { setUserInfo, storeToken} = auth.actions;

export default auth.reducer;
