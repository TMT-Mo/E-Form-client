import { CreateDocumentArgs } from "./../models/document";
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
  isCreateDocumentLoading?: boolean;
}

const initialState: State = {
  isCreateDocumentLoading: false,
};

const ACTION_TYPE = "document/";

type CR<T> = CaseReducer<State, PayloadAction<T>>;

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
        )
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
  reducers: {},
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
  },
});

export {createDocument}

export const {} = document.actions

export default document.reducer;

