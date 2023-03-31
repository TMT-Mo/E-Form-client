import { systemServices } from "services/system";
import {
  CreateAccountArgs,
  CreateDepartmentArgs,
  CreateRoleArgs,
  Department,
  EditAccountArgs,
  EditDepartmentArgs,
  EditRoleArgs,
  GetUsersArgs,
  IUser,
  Permission,
  Role,
} from "models/system";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import { handleError, handleSuccess } from "./alert";
import { TemplateType } from "models/template";

interface State {
  total?: number;
  size?: number;
  searchItemValue?: string;
  currentPage: number;
  departmentList: Department[];
  userList: IUser[];
  permissionList: Permission[];
  templateTypeList: TemplateType[];
  roleList: Role[];
  accountDetail?: IUser;
  isGetDepartmentsLoading: boolean;
  isOpenDepartmentList: boolean;
  isGetUserListLoading: boolean;
  isGetTemplateTypesLoading: boolean;
  isOpenTemplateTypes: boolean;
  isGetSignerLoading: boolean;
  isGetPermissionLoading: boolean;
  isGetRoleLoading: boolean;
  isCreateAccountLoading: boolean;
  isEditAccountLoading: boolean;
  isCreateRoleLoading: boolean;
  isEditRoleLoading: boolean;
  isCreateDepartmentLoading: boolean;
  isEditDepartmentLoading: boolean;
}

const initialState: State = {
  total: undefined,
  size: 10,
  currentPage: 0,
  searchItemValue: undefined,
  templateTypeList: [],
  departmentList: [],
  userList: [],
  permissionList: [],
  roleList: [],
  accountDetail: undefined,
  isGetDepartmentsLoading: false,
  isOpenDepartmentList: false,
  isGetUserListLoading: false,
  isGetPermissionLoading: false,
  isGetTemplateTypesLoading: false,
  isOpenTemplateTypes: false,
  isGetSignerLoading: false,
  isCreateAccountLoading: false,
  isGetRoleLoading: false,
  isEditAccountLoading: false,
  isCreateRoleLoading: false,
  isEditRoleLoading: false,
  isCreateDepartmentLoading: false,
  isEditDepartmentLoading: false,
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

const getAccountDetailCR: CR<{ account: IUser }> = (state, { payload }) => ({
  ...state,
  accountDetail: payload.account,
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

const getRoleList = createAsyncThunk(
  `${ACTION_TYPE}getRoleList`,
  async (_, { dispatch }) => {
    try {
      const result = await systemServices.getRoleList();
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
      dispatch(handleSuccess({ message: result.message }));
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

const editAccount = createAsyncThunk(
  `${ACTION_TYPE}editAccount`,
  async (args: EditAccountArgs, { dispatch }) => {
    try {
      const result = await systemServices.editAccount(args);
      dispatch(handleSuccess({ message: result.message }));
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
const createDepartment = createAsyncThunk(
  `${ACTION_TYPE}createDepartment`,
  async (args: CreateDepartmentArgs, { dispatch }) => {
    try {
      const result = await systemServices.createDepartment(args);
      dispatch(handleSuccess({ message: result.message }));
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

const editDepartment = createAsyncThunk(
  `${ACTION_TYPE}editDepartment`,
  async (args: EditDepartmentArgs, { dispatch }) => {
    try {
      const result = await systemServices.editDepartment(args);
      dispatch(handleSuccess({ message: result.message }));
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
const createRole = createAsyncThunk(
  `${ACTION_TYPE}createRole`,
  async (args: CreateRoleArgs, { dispatch }) => {
    try {
      const result = await systemServices.createRole(args);
      dispatch(handleSuccess({ message: result.message }));
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

const editRole = createAsyncThunk(
  `${ACTION_TYPE}editRole`,
  async (args: EditRoleArgs, { dispatch }) => {
    try {
      const result = await systemServices.editRole(args);
      dispatch(handleSuccess({ message: result.message }));
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
      total: undefined,
      size: 10,
      currentPage: 0,
    }),
    clearAccountDetail: (state: State) => ({
      ...state,
      accountDetail: undefined,
    }),
    clearAccountPagination: (state: State) => ({
      ...state,
      currentPage: 0,
    }),
    onChangeAccountPage: onChangeAccountPageCR,
    searchAccount: searchAccountCR,
    getAccountDetail: getAccountDetailCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentList.pending, (state) => ({
      ...state,
      isGetDepartmentsLoading: true,
    }));
    builder.addCase(getDepartmentList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetDepartmentsLoading: false,
      departmentList: payload.items!,
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
      templateTypeList: payload.items,
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
    builder.addCase(getRoleList.pending, (state) => ({
      ...state,
      isGetRoleLoading: true,
    }));
    builder.addCase(getRoleList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetRoleLoading: false,
      roleList: payload.items,
    }));
    builder.addCase(getRoleList.rejected, (state) => ({
      ...state,
      isGetRoleLoading: false,
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
    builder.addCase(editAccount.pending, (state) => ({
      ...state,
      isEditAccountLoading: true,
    }));
    builder.addCase(editAccount.fulfilled, (state, { payload }) => ({
      ...state,
      isEditAccountLoading: false,
    }));
    builder.addCase(editAccount.rejected, (state) => ({
      ...state,
      isEditAccountLoading: false,
    }));
    builder.addCase(createDepartment.pending, (state) => ({
      ...state,
      isCreateDepartmentLoading: true,
    }));
    builder.addCase(createDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      isCreateDepartmentLoading: false,
    }));
    builder.addCase(createDepartment.rejected, (state) => ({
      ...state,
      isCreateDepartmentLoading: false,
    }));
    builder.addCase(editDepartment.pending, (state) => ({
      ...state,
      isEditDepartmentLoading: true,
    }));
    builder.addCase(editDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      isEditDepartmentLoading: false,
    }));
    builder.addCase(editDepartment.rejected, (state) => ({
      ...state,
      isEditDepartmentLoading: false,
    }));
    builder.addCase(createRole.pending, (state) => ({
      ...state,
      isCreateRoleLoading: true,
    }));
    builder.addCase(createRole.fulfilled, (state, { payload }) => ({
      ...state,
      isCreateRoleLoading: false,
    }));
    builder.addCase(createRole.rejected, (state) => ({
      ...state,
      isCreateRoleLoading: false,
    }));
    builder.addCase(editRole.pending, (state) => ({
      ...state,
      isEditRoleLoading: true,
    }));
    builder.addCase(editRole.fulfilled, (state, { payload }) => ({
      ...state,
      isEditRoleLoading: false,
    }));
    builder.addCase(editRole.rejected, (state) => ({
      ...state,
      isEditRoleLoading: false,
    }));
  },
});

export {
  getDepartmentList,
  getUserList,
  getSigner,
  getTemplateTypeList,
  createAccount,
  getPermissionList,
  editAccount,
  editDepartment,
  editRole,
  createRole,
  createDepartment,
  getRoleList
};

export const {
  toggleDepartmentList,
  toggleTemplateTypeList,
  clearUserList,
  onChangeAccountPage,
  searchAccount,
  clearAccountPagination,
  getAccountDetail,
  clearAccountDetail,
} = system.actions;
export default system.reducer;
