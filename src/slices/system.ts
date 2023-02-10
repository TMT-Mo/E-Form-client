import { systemServices } from "./../services/system";
import { DepartmentListResponse, GetUsersArgs, GetUsersResponse } from "./../models/system";
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
  userList?: GetUsersResponse;
  isGetTemplateTypesLoading: boolean;
  templateTypeList?: GetTemplateTypeListResponse;
  isOpenTemplateTypes: boolean;
  isGetSignerLoading: boolean
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
  isGetSignerLoading: false
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
      if(err.response?.data){
        dispatch(handleError({ errorMessage: (err.response?.data as ValidationErrors).errorMessage }));
      }
      else{
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err
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
      if(err.response?.data){
        dispatch(handleError({ errorMessage: (err.response?.data as ValidationErrors).errorMessage }));
      }
      else{
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err
    }
  }
);

const getSigner = createAsyncThunk(
  `${ACTION_TYPE}getSigner`,
  async (args: GetUsersArgs | undefined, { dispatch }) => {
    try {
      const result = await systemServices.getSigner(args)
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if(err.response?.data){
        dispatch(handleError({ errorMessage: (err.response?.data as ValidationErrors).errorMessage }));
      }
      else{
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err
    }
  }
);
// const getUsers = createAsyncThunk(
//   `${ACTION_TYPE}getUsers`,
//   async (args: GetUsersArgs | undefined, { dispatch }) => {
//     try {
//       const result = await systemServices.getUsers(args)
//       return result;
//     } catch (error) {
//       const err = error as AxiosError;
//       if(err.response?.data){
//         dispatch(handleError({ errorMessage: (err.response?.data as ValidationErrors).errorMessage }));
//       }
//       else{
//         dispatch(handleError({ errorMessage: err.message }));
//       }
//       throw err
//     }
//   }
// );

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
    builder.addCase(getSigner.pending, (state) => ({
      ...state,
      isGetSignerLoading: true,
    }));
    builder.addCase(
      getSigner.fulfilled,
      (state, { payload }) => ({
        ...state,
        isGetSignerLoading: false,
        userList: payload!,
      })
    );
    builder.addCase(getSigner.rejected, (state) => ({
      ...state,
      isGetSignerLoading: false,
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
  // getUsers,
  getSigner,
  getTemplateTypeList,
};

export const { toggleDepartmentList, toggleTemplateTypeList, clearUserList } = system.actions;
export default system.reducer;
