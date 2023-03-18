import { Department } from "./../models/system";
import {
  ApproveDocumentArgs,
  ChangeSignerDocumentArgs,
  CreateDocumentArgs,
  Document,
  GetDocumentHistoryArgs,
  GetDocumentsArgs,
  GetSharedDepartmentsArgs,
  GetSharedDocumentArgs,
  GetSharedUsersArgs,
  LockDocumentArgs,
  ShareDepartmentsArgs,
  SharedUser,
  ShareUsersArgs,
} from "./../models/document";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { documentServices } from "../services/document";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/alert";
import { handleSuccess, handleError } from "./alert";
interface State {
  isCreateDocumentLoading: boolean;
  documentList: Document[];
  isGetDocumentListLoading: boolean;
  searchItemValue?: string;
  total?: number;
  size?: number;
  currentPage: number;
  documentDetail?: Document;
  sharedDepartment: Department[];
  sharedUser: SharedUser[];
  isApproveDocumentLoading: boolean;
  isLockDocumentLoading: boolean;
  isGetSharedDepartmentLoading: boolean;
  isGetSharedUserLoading: boolean;
  isGetSharedDocumentLoading: boolean;
  isShareDepartmentLoading: boolean;
  isShareUserLoading: boolean;
  isChangeSignerDocumentLoading: boolean;
}

const initialState: State = {
  isCreateDocumentLoading: false,
  documentList: [],
  sharedDepartment: [],
  isGetDocumentListLoading: false,
  searchItemValue: undefined,
  total: undefined,
  size: 10,
  currentPage: 0,
  documentDetail: undefined,
  isApproveDocumentLoading: false,
  isLockDocumentLoading: false,
  isChangeSignerDocumentLoading: false,
  isGetSharedDepartmentLoading: false,
  isShareDepartmentLoading: false,
  isShareUserLoading: false,
  isGetSharedUserLoading: false,
  isGetSharedDocumentLoading: false,
  sharedUser: []
};

const ACTION_TYPE = "document/";

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const onChangeDocumentPageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

const getDocumentDetailCR: CR<{ document: Document }> = (
  state,
  { payload }
) => ({
  ...state,
  documentDetail: payload.document!,
});

const searchDocumentCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value!,
});

const updateDocumentCR: CR<{ id: number; isLocked: boolean }> = (
  state,
  { payload }
) => {
  state.documentList.forEach(function (value, index) {
    if (value.id === payload.id) {
      value.isLocked = payload.isLocked;
    }
  });
};

const createDocument = createAsyncThunk(
  `${ACTION_TYPE}createDocument`,
  async (args: CreateDocumentArgs, { dispatch }) => {
    try {
      const result = await documentServices.createDocument({
        ...args,
      });
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

const approveDocument = createAsyncThunk(
  `${ACTION_TYPE}approveDocument`,
  async (args: ApproveDocumentArgs, { dispatch }) => {
    try {
      const result = await documentServices.approveDocument({
        ...args,
      });
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
const lockDocument = createAsyncThunk(
  `${ACTION_TYPE}lockDocument`,
  async (args: LockDocumentArgs, { dispatch }) => {
    try {
      const result = await documentServices.lockDocument({
        ...args,
      });
      dispatch(updateDocument({ ...args }));
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
const shareDepartment = createAsyncThunk(
  `${ACTION_TYPE}shareDepartment`,
  async (args: ShareDepartmentsArgs, { dispatch }) => {
    try {
      const result = await documentServices.shareDepartments({
        ...args,
      });
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
const shareUsers = createAsyncThunk(
  `${ACTION_TYPE}shareUsers`,
  async (args: ShareUsersArgs, { dispatch }) => {
    try {
      const result = await documentServices.shareUsers({
        ...args,
      });
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
const changeSignerDocument = createAsyncThunk(
  `${ACTION_TYPE}changeSignerDocument`,
  async (args: ChangeSignerDocumentArgs, { dispatch }) => {
    try {
      const result = await documentServices.changeSignerDocument({
        ...args,
      });
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
const getSharedDepartment = createAsyncThunk(
  `${ACTION_TYPE}getSharedDepartment`,
  async (args: GetSharedDepartmentsArgs, { dispatch }) => {
    try {
      const result = await documentServices.getSharedDepartments({
        ...args,
      });
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
const getSharedUser = createAsyncThunk(
  `${ACTION_TYPE}getSharedUser`,
  async (args: GetSharedUsersArgs, { dispatch }) => {
    try {
      const result = await documentServices.getSharedUsers({
        ...args,
      });
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

const getDocuments = createAsyncThunk(
  `${ACTION_TYPE}getDocuments`,
  async (args: GetDocumentsArgs, { dispatch }) => {
    try {
      const result = await documentServices.getDocuments({
        ...args,
      });
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

const getDocumentHistory = createAsyncThunk(
  `${ACTION_TYPE}getDocumentHistory`,
  async (args: GetDocumentHistoryArgs, { dispatch }) => {
    try {
      const result = await documentServices.getDocumentHistory({
        ...args,
      });
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
const getSharedDocument = createAsyncThunk(
  `${ACTION_TYPE}getSharedDocument`,
  async (args: GetSharedDocumentArgs, { dispatch }) => {
    try {
      const result = await documentServices.getSharedDocument({
        ...args,
      });
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

const document = createSlice({
  name: "document",
  initialState,
  reducers: {
    onChangeDocumentPage: onChangeDocumentPageCR,
    clearDocuments: (state: State) => ({
      ...state,
      documentList: [],
      searchItemValue: undefined,
      filter: undefined,
      total: undefined,
      size: 10,
      currentPage: 0,
    }),
    clearDocumentPagination: (state: State) => ({
      ...state,
      currentPage: 0,
    }),
    clearDocumentDetail: (state: State) => ({
      ...state,
      documentDetail: undefined,
    }),
    getDocumentDetail: getDocumentDetailCR,
    searchDocument: searchDocumentCR,
    updateDocument: updateDocumentCR,
    clearSharedInfo: (state: State) => ({
      ...state,
      sharedDepartment: [],
      SharedUser: [],
    }),
    
  },
  extraReducers: (builder) => {
    builder.addCase(createDocument.pending, (state) => ({
      ...state,
      isCreateDocumentLoading: true,
    }));
    builder.addCase(createDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isCreateDocumentLoading: false,
    }));
    builder.addCase(createDocument.rejected, (state) => ({
      ...state,
      isCreateDocumentLoading: false,
    }));
    builder.addCase(approveDocument.pending, (state) => ({
      ...state,
      isApproveDocumentLoading: true,
    }));
    builder.addCase(approveDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isApproveDocumentLoading: false,
    }));
    builder.addCase(approveDocument.rejected, (state) => ({
      ...state,
      isApproveDocumentLoading: false,
    }));
    builder.addCase(lockDocument.pending, (state) => ({
      ...state,
      isLockDocumentLoading: true,
    }));
    builder.addCase(lockDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isLockDocumentLoading: false,
    }));
    builder.addCase(lockDocument.rejected, (state) => ({
      ...state,
      isLockDocumentLoading: false,
    }));
    builder.addCase(shareDepartment.pending, (state) => ({
      ...state,
      isShareDepartmentLoading: true,
    }));
    builder.addCase(shareDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      isShareDepartmentLoading: false,
    }));
    builder.addCase(shareDepartment.rejected, (state) => ({
      ...state,
      isShareDepartmentLoading: false,
    }));
    builder.addCase(shareUsers.pending, (state) => ({
      ...state,
      isShareUserLoading: true,
    }));
    builder.addCase(shareUsers.fulfilled, (state, { payload }) => ({
      ...state,
      isShareUserLoading: false,
    }));
    builder.addCase(shareUsers.rejected, (state) => ({
      ...state,
      isShareUserLoading: false,
    }));
    builder.addCase(changeSignerDocument.pending, (state) => ({
      ...state,
      isChangeSignerDocumentLoading: true,
    }));
    builder.addCase(changeSignerDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isChangeSignerDocumentLoading: false,
    }));
    builder.addCase(changeSignerDocument.rejected, (state) => ({
      ...state,
      isChangeSignerDocumentLoading: false,
    }));
    builder.addCase(getSharedUser.pending, (state) => ({
      ...state,
      isGetSharedUserLoading: true,
    }));
    builder.addCase(getSharedUser.fulfilled, (state, { payload }) => ({
      ...state,
      isGetSharedUserLoading: false,
      sharedUser: payload.items[0].users,
    }));
    builder.addCase(getSharedUser.rejected, (state) => ({
      ...state,
      isGetSharedUserLoading: false,
    }));
    builder.addCase(getSharedDepartment.pending, (state) => ({
      ...state,
      isGetSharedDepartmentLoading: true,
    }));
    builder.addCase(getSharedDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      isGetSharedDepartmentLoading: false,
      sharedDepartment: payload.items[0].departments,
    }));
    builder.addCase(getSharedDepartment.rejected, (state) => ({
      ...state,
      isGetSharedDepartmentLoading: false,
    }));
    builder.addCase(getDocuments.pending, (state) => ({
      ...state,
      isGetDocumentListLoading: true,
    }));
    builder.addCase(getDocuments.fulfilled, (state, { payload }) => ({
      ...state,
      isGetDocumentListLoading: false,
      documentList: payload.items,
      total: payload?.total!,
    }));
    builder.addCase(getDocuments.rejected, (state) => {
      if (state.isGetDocumentListLoading) return; //* Handle api abort
      return {
        ...state,
        isGetDocumentListLoading: false,
      };
    });
    builder.addCase(getSharedDocument.pending, (state) => ({
      ...state,
      isGetDocumentListLoading: true,
    }));
    builder.addCase(getSharedDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isGetDocumentListLoading: false,
      documentList: payload.items,
      total: payload?.total!,
    }));
    builder.addCase(getSharedDocument.rejected, (state) => {
      if (state.isGetDocumentListLoading) return; //* Handle api abort
      return {
        ...state,
        isGetDocumentListLoading: false,
      };
    });
    builder.addCase(getDocumentHistory.pending, (state) => ({
      ...state,
      isGetDocumentListLoading: true,
    }));
    builder.addCase(getDocumentHistory.fulfilled, (state, { payload }) => ({
      ...state,
      isGetDocumentListLoading: false,
      documentList: payload.items,
      total: payload?.total!,
    }));
    builder.addCase(getDocumentHistory.rejected, (state) => {
      if (state.isGetDocumentListLoading) return; //* Handle api abort
      return {
        ...state,
        isGetDocumentHistoryLoading: false,
      };
    });
  },
});

export {
  createDocument,
  getDocuments,
  approveDocument,
  getDocumentHistory,
  lockDocument,
  changeSignerDocument,
  getSharedDepartment,
  getSharedDocument,
  shareDepartment,
  getSharedUser,
  shareUsers
};

export const {
  onChangeDocumentPage,
  clearDocuments,
  getDocumentDetail,
  clearDocumentDetail,
  searchDocument,
  updateDocument,
  clearDocumentPagination,
  clearSharedInfo,
} = document.actions;

export default document.reducer;
