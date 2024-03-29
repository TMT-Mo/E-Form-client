import {
  CheckNotificationArgs,
  GetNotificationArgs,
} from "models/notification";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Notification } from "models/notification";
import { notificationServices } from "services/notification";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import { handleError } from "./alert";

interface State {
  isGetNotification: boolean;
  isCheckNotificationLoading: boolean;
  notificationList: Notification[];
  hasNewNotification: boolean;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "notification/";

const initialState: State = {
  isGetNotification: false,
  isCheckNotificationLoading: false,
  notificationList: [],
  hasNewNotification: false,
};

const getNewNotificationCR: CR<{ hasNewNotification: boolean }> = (
  state,
  { payload }
) => ({
  ...state,
  hasNewNotification: payload.hasNewNotification,
});

const checkAllNotificationCR: CR<{ isCheck: true }> = (state, { payload }) => {
  state.notificationList.forEach((value) => {
    value.isChecked = payload.isCheck;
  });
};

const getNotification = createAsyncThunk(
  `${ACTION_TYPE}getNotification`,
  async (args: GetNotificationArgs, { dispatch }) => {
    try {
      const result = (await notificationServices.getNotificationList(
        args
      )) as Notification[];
      if (result.find((value) => value.isChecked === false)) {
        dispatch(getNewNotification({ hasNewNotification: true }));
      }
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.data) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
      } else {
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err;
    }
  }
);

const checkNotification = createAsyncThunk(
  `${ACTION_TYPE}checkNotification`,
  async (args: CheckNotificationArgs, { dispatch }) => {
    try {
      const result = await notificationServices.checkNotification(args);
      dispatch(getNewNotification({ hasNewNotification: false }));
      dispatch(checkAllNotification({ isCheck: true }));
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.data) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
      } else {
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err;
    }
  }
);

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNewNotification: getNewNotificationCR,
    checkAllNotification: checkAllNotificationCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getNotification.pending, (state) => ({
      ...state,
      isGetNotification: true,
    }));
    builder.addCase(getNotification.fulfilled, (state, { payload }) => ({
      ...state,
      isGetNotification: false,
      notificationList: payload.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    }));
    builder.addCase(getNotification.rejected, (state) => ({
      ...state,
      isGetNotification: false,
    }));
    builder.addCase(checkNotification.pending, (state) => ({
      ...state,
      isCheckNotificationLoading: true,
    }));
    builder.addCase(checkNotification.fulfilled, (state, { payload }) => ({
      ...state,
      isCheckNotificationLoading: false,
    }));
    builder.addCase(checkNotification.rejected, (state) => ({
      ...state,
      isCheckNotificationLoading: false,
    }));
  },
});

export { getNotification, checkNotification };

export const { getNewNotification, checkAllNotification } =
  notification.actions;

export default notification.reducer;
