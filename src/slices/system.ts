import { systemServices } from "./../services/system";
import { DepartmentListResponse, UserListResponse } from "./../models/system";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/notification";
import { handleError } from "./notification";
import { GetTemplateTypeListResponse } from "../models/template";

interface State {
  isGetDepartmentsLoading: boolean;
  isOpenDepartmentList: boolean;
  departmentList?: DepartmentListResponse;
  isGetUserListLoading: boolean;
  userList?: UserListResponse;
  isGetTemplateTypesLoading: boolean;
  templateTypeList?: GetTemplateTypeListResponse;
  isOpenTemplateTypes: boolean;
}

const initialState: State = {
  isGetDepartmentsLoading: false,
  departmentList: undefined,
  isOpenDepartmentList: false,
  isGetUserListLoading: false,
  userList: undefined,
  isGetTemplateTypesLoading: false,
  templateTypeList: undefined,
  isOpenTemplateTypes: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "system/";

const toggleDepartmentListCR: CR<{ isOpen: boolean }> = (
  state,
  { payload }
) => ({
  ...state,
  isOpenDepartmentList: payload.isOpen,
});

const toggleTemplateTypeListCR: CR<{ isOpen: boolean }> = (
  state,
  { payload }
) => ({
  ...state,
  isOpenTemplateTypes: payload.isOpen,
});
const clearUserListCR = (state:State) => ({
  ...state,
  userList: undefined,
});

const getDepartmentList = createAsyncThunk(
  `${ACTION_TYPE}getDepartmentList`,
  async (args, { dispatch }) => {
    try {
      const result = await systemServices.getDepartmentList();
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
        throw err;
      }
    }
  }
);

const getTemplateTypeList = createAsyncThunk(
  `${ACTION_TYPE}getTemplateTypeList`,
  async (args, { dispatch }) => {
    try {
      const result = await systemServices.getTemplateTypeList();
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
        throw err;
      }
    }
  }
);

const getUserListByDepartmentID = createAsyncThunk(
  `${ACTION_TYPE}getUserListByDepartmentID`,
  async (departmentID: number, { dispatch }) => {
    try {
      const result = await systemServices.getUserListByDepartmentID(
        departmentID
      );
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
        throw err;
      }
    }
  }
);

const system = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDepartmentList: toggleDepartmentListCR,
    toggleTemplateTypeList: toggleTemplateTypeListCR,
    clearUserList: clearUserListCR
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentList.pending, (state) => ({
      ...state,
      isGetDepartmentsLoading: true,
    }));
    builder.addCase(getDepartmentList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetDepartmentsLoading: false,
      departmentList: payload!,
    }));
    builder.addCase(getDepartmentList.rejected, (state) => ({
      ...state,
      isGetDepartmentsLoading: false,
    }));
    builder.addCase(getUserListByDepartmentID.pending, (state) => ({
      ...state,
      isGetUserListLoading: true,
    }));
    builder.addCase(
      getUserListByDepartmentID.fulfilled,
      (state, { payload }) => ({
        ...state,
        isGetUserListLoading: false,
        userList: payload!,
      })
    );
    builder.addCase(getUserListByDepartmentID.rejected, (state) => ({
      ...state,
      isGetUserListLoading: false,
    }));
    builder.addCase(getTemplateTypeList.pending, (state) => ({
      ...state,
      isGetTemplateTypesLoading: true,
    }));
    builder.addCase(getTemplateTypeList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetTemplateTypesLoading: false,
      templateTypeList: payload!,
    }));
    builder.addCase(getTemplateTypeList.rejected, (state) => ({
      ...state,
      isGetTemplateTypesLoading: false,
    }));
  },
});

export {
  getDepartmentList,
  getUserListByDepartmentID,
  getTemplateTypeList,
};

export const { toggleDepartmentList, toggleTemplateTypeList, clearUserList } = system.actions;
export default system.reducer;
