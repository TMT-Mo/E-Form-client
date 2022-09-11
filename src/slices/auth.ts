import { authServices } from "./../services/auth";
import { UserInfo, LoginArgument} from "./../models/auth";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface State {
  // token: string | null;
  userInfo?: UserInfo;
  isLoginLoading: boolean;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const initialState: State = {
  // token: null,
  userInfo: undefined,
  isLoginLoading: false,
};

const login = createAsyncThunk(`login`, async (args: LoginArgument) => {
  const result = await authServices.login(args);
  return result;
});

const setUserInfoCR: CR<{ token: string | null }> = (
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
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      isLoginLoading: false,
      // token: payload.token,
      userInfo: jwtDecode(payload.token!)
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      isLoginLoading: false,
    }));
  },
});

export { login };

export const { setUserInfo } = auth.actions;

export default auth.reducer;
