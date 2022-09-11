import { NotificationStatusArg } from "./../utils/constants";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  status?: NotificationStatusArg.SUCCESS | NotificationStatusArg.ERROR;
  message?: string;
  error?: string;
  duration?: number;
  isOpen: boolean;
}

const initialState: State = {
  status: undefined,
  message: undefined,
  error: undefined,
  duration: undefined,
  isOpen: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const handleSuccessCR: CR<{ message: string }> = (state, { payload }) => ({
  ...state,
  status: NotificationStatusArg.SUCCESS,
  message: payload.message,
  isOpen: true,
});

const handleErrorCR: CR<{ message: string }> = (state, { payload }) => ({
  ...state,
  status: NotificationStatusArg.ERROR,
  message: payload.message,
  isOpen: true,
});

const handleCloseCR = (state: State) => ({
  ...state,
  isOpen: false,
});

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handleSuccess: handleSuccessCR,
    handleClose: handleCloseCR,
    handleError: handleErrorCR,
  },
});

export const { handleSuccess, handleError, handleClose } = notification.actions;

export default notification.reducer;
