import { NotificationStatus } from "./../utils/constants";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../models/notification";

// interface State {
//   status?: NotificationStatus.SUCCESS | NotificationStatus.ERROR;
//   message?: string;
//   error?: string;
//   duration?: number;
//   isOpen: boolean;
// }

const initialState: Notification = {
  status: undefined,
  message: undefined,
  errorMessage: undefined,
  duration: undefined,
  isOpen: false,
};

type CR<T> = CaseReducer<Notification, PayloadAction<T>>;

const handleSuccessCR: CR<{ message: string | undefined }> = (state, { payload }) => ({
  ...state,
  status: NotificationStatus.SUCCESS,
  message: payload.message,
  isOpen: true,
});

const handleErrorCR: CR<{ errorMessage: string | undefined }> = (state, { payload }) => ({
  ...state,
  status: NotificationStatus.ERROR,
  errorMessage: payload.errorMessage,
  isOpen: true,
});



const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handleSuccess: handleSuccessCR,
    handleClose: (state: Notification) => ({
      ...state,
      status: undefined,
      isOpen: false,
      message: undefined,
      errorMessage: undefined,
    }),
    handleError: handleErrorCR,
  },
});

export const { handleSuccess, handleError, handleClose } = notification.actions;

export default notification.reducer;
