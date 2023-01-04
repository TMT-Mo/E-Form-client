import {
  CreateDocumentArgs,
  Document,
  GetDocumentsArgs,
} from "./../models/document";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { documentServices } from "../services/document";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/notification";
import { handleSuccess, handleError } from "./notification";
interface State {
  isCreateDocumentLoading: boolean;
  documentList: Document[];
  isGetDocumentListLoading: boolean;
  searchItemValue?: string;
  total?: number;
  size?: number;
  currentPage: number;
  documentDetail?: Document;
}

const initialState: State = {
  isCreateDocumentLoading: false,
  documentList: [],
  isGetDocumentListLoading: false,
  searchItemValue: undefined,
  total: undefined,
  size: 10,
  currentPage: 0,
  documentDetail: undefined,
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

const searchDocumentCR: CR<{ value: string }> = (
  state,
  { payload }
) => ({
  ...state,
  searchItemValue: payload.value!,
});

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
      currentPage: 0
    }),
    clearDocumentDetail: (state: State) => ({
      ...state,
      documentDetail: undefined,
    }),
    getDocumentDetail: getDocumentDetailCR,
    searchDocument: searchDocumentCR
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
  },
});

export { createDocument, getDocuments };

export const { onChangeDocumentPage, clearDocuments, getDocumentDetail, clearDocumentDetail, searchDocument, clearDocumentPagination } = document.actions;

export default document.reducer;
