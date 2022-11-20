import { authServices } from "./../services/auth";
import { UserInfo, LoginArgument, LoginResponse } from "./../models/auth";
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
  error: string | null | undefined;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const initialState: State = {
  // token: null,
  userInfo: undefined,
  isLoginLoading: false,
  error: undefined,
};

const login = createAsyncThunk(
  `login`,
  async (args: LoginArgument, { rejectWithValue, dispatch }) => {
    // const result = await authServices.login(args as LoginArgument)
    // return result;
    try {
      const result = await authServices.login(args as LoginArgument);
      return result;
    } catch (error) {
      const err = error as AxiosError
      if(err.response){
        dispatch(handleError({ errorMessage: err.response?.data.errorMessage }));
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



const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: setUserInfoCR,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      isLoginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if(payload?.token){
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
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      isLoginLoading: false,
    }));
  },
});

export { login };

export const { setUserInfo } = auth.actions;

export default auth.reducer;
