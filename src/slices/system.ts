import { systemServices } from "./../services/system";
import {
  CreateAccountArgs,
  DepartmentListResponse,
  GetUsersArgs,
  IUser,
  Permission
} from "./../models/system";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/alert";
import { handleError, handleSuccess } from "./alert";
import { GetTemplateTypeListResponse } from "../models/template";

interface State {
  total?: number;
  size?: number;
  searchItemValue?: string;
  currentPage: number;
  isGetDepartmentsLoading: boolean;
  isOpenDepartmentList: boolean;
  departmentList?: DepartmentListResponse;
  isGetUserListLoading: boolean;
  userList: IUser[];
  permissionList: Permission[];
  isGetTemplateTypesLoading: boolean;
  templateTypeList?: GetTemplateTypeListResponse;
  isOpenTemplateTypes: boolean;
  isGetSignerLoading: boolean;
  isCreateAccountLoading: boolean;
  isGetPermissionLoading: boolean;
}

const initialState: State = {
  total: undefined,
  size: 10,
  currentPage: 0,
  searchItemValue: undefined,
  isGetDepartmentsLoading: false,
  departmentList: undefined,
  isOpenDepartmentList: false,
  isGetUserListLoading: false,
  userList: [],
  permissionList: [],
  isGetPermissionLoading: false,
  isGetTemplateTypesLoading: false,
  templateTypeList: undefined,
  isOpenTemplateTypes: false,
  isGetSignerLoading: false,
  isCreateAccountLoading: false,
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

const onChangeAccountPageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

const searchAccountCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value!,
});

const getDepartmentList = createAsyncThunk(
  `${ACTION_TYPE}getDepartmentList`,
  async (args, { dispatch }) => {
    try {
      const result = await systemServices.getDepartmentList();
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

const getTemplateTypeList = createAsyncThunk(
  `${ACTION_TYPE}getTemplateTypeList`,
  async (args, { dispatch }) => {
    try {
      const result = await systemServices.getTemplateTypeList();
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

const getSigner = createAsyncThunk(
  `${ACTION_TYPE}getSigner`,
  async (args: GetUsersArgs | undefined, { dispatch }) => {
    try {
      const result = await systemServices.getSigner(args);
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

const getUserList = createAsyncThunk(
  `${ACTION_TYPE}getUserList`,
  async (args: GetUsersArgs, { dispatch }) => {
    try {
      const result = await systemServices.getUserList(args);
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
const getPermissionList = createAsyncThunk(
  `${ACTION_TYPE}getPermissionList`,
  async (_, { dispatch }) => {
    try {
      const result = await systemServices.getPermissionList();
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

const createAccount = createAsyncThunk(
  `${ACTION_TYPE}createAccount`,
  async (args: CreateAccountArgs, { dispatch }) => {
    try {
      const result = await systemServices.createAccount(args);
      dispatch(handleSuccess({message: result.message}))
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

const system = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDepartmentList: toggleDepartmentListCR,
    toggleTemplateTypeList: toggleTemplateTypeListCR,
    clearUserList: (state: State) => ({
      ...state,
      userList: [],
      searchItemValue: undefined,
      filter: undefined,
      total: undefined,
      size: 10,
      currentPage: 0,
    }),
    clearAccountPagination: (state: State) => ({
      ...state,
      currentPage: 0,
    }),
    onChangeAccountPage: onChangeAccountPageCR,
    searchAccount: searchAccountCR
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
    builder.addCase(getSigner.fulfilled, (state, { payload }) => ({
      ...state,
      isGetSignerLoading: false,
      userList: payload.items,
    }));
    builder.addCase(getSigner.rejected, (state) => ({
      ...state,
      isGetSignerLoading: false,
    }));
    builder.addCase(getUserList.pending, (state) => ({
      ...state,
      isGetUserListLoading: true,
    }));
    builder.addCase(getUserList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetUserListLoading: false,
      userList: payload.items,
      total: payload?.total!,
    }));
    builder.addCase(getUserList.rejected, (state) => ({
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
    builder.addCase(getPermissionList.pending, (state) => ({
      ...state,
      isGetPermissionLoading: true,
    }));
    builder.addCase(getPermissionList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetPermissionLoading: false,
      permissionList: payload.permissionList,
    }));
    builder.addCase(getPermissionList.rejected, (state) => ({
      ...state,
      isGetPermissionLoading: false,
    }));
    builder.addCase(createAccount.pending, (state) => ({
      ...state,
      isCreateAccountLoading: true,
    }));
    builder.addCase(createAccount.fulfilled, (state, { payload }) => ({
      ...state,
      isCreateAccountLoading: false,
    }));
    builder.addCase(createAccount.rejected, (state) => ({
      ...state,
      isCreateAccountLoading: false,
    }));
  },
});

export { getDepartmentList, getUserList, getSigner, getTemplateTypeList, createAccount, getPermissionList };

export const {
  toggleDepartmentList,
  toggleTemplateTypeList,
  clearUserList,
  onChangeAccountPage,
  searchAccount,
  clearAccountPagination,
} = system.actions;
export default system.reducer;
