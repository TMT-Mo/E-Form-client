import { AlertStatus } from "../utils/constants";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "../models/alert";

const initialState: Alert = {
  status: undefined,
  message: undefined,
  errorMessage: undefined,
  duration: undefined,
  isOpen: false,
};

type CR<T> = CaseReducer<Alert, PayloadAction<T>>;

const handleSuccessCR: CR<{ message: string | undefined }> = (state, { payload }) => ({
  ...state,
  status: AlertStatus.SUCCESS,
  message: payload.message,
  isOpen: true,
});

const handleErrorCR: CR<{ errorMessage: string | undefined }> = (state, { payload }) => ({
  ...state,
  status: AlertStatus.ERROR,
  errorMessage: payload.errorMessage,
  isOpen: true,
});

const handleInfoCR: CR<{ message: string | undefined }> = (state, { payload }) => ({
  ...state,
  status: AlertStatus.INFO,
  message: payload.message,
  isOpen: true,
});



const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    handleSuccess: handleSuccessCR,
    handleClose: (state: Alert) => ({
      ...state,
      status: undefined,
      isOpen: false,
      message: undefined,
      errorMessage: undefined,
    }),
    handleError: handleErrorCR,
    handleInfo: handleInfoCR
  },
});

export const { handleSuccess, handleError, handleClose } = alert.actions;

export default alert.reducer;
