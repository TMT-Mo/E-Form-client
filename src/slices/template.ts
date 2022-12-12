import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Template, GetTemplateArgs, AddTemplateToFirebaseArgs, } from './../models/template';
import { templateServices } from './../services/template';
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/notification";
import { handleError, handleSuccess } from "./notification";
import { NotificationStatus } from '../utils/constants';

interface State {
    isGetTemplatesLoading: boolean;
    templateList: Template[]
    isAddNewTemplateLoading: boolean;
    searchItemValue?: string;
}

const initialState: State = {
  templateList: [],
  isGetTemplatesLoading: false,
  isAddNewTemplateLoading: false,
  searchItemValue: undefined
};

const ACTION_TYPE = 'template/'

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const searchTemplateCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value
});

const getTemplates = createAsyncThunk(`${ACTION_TYPE}getTemplates`, async (args: GetTemplateArgs, {dispatch}) => {
  try {
    const result = await templateServices.getTemplates(args)
    return result
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
});

const addNewTemplate = createAsyncThunk(`${ACTION_TYPE}addNewTemplate`, async (args: AddTemplateToFirebaseArgs, {dispatch}) => {
  try {
    const uploadTask = await uploadBytesResumable(args.storageRef, args.file);
    const url = await getDownloadURL(uploadTask.ref);
    const result = await templateServices.addNewTemplate({...args.templateInfo, link: url})
    dispatch(
      handleSuccess({message: result.message})
    );
    return result
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
});

const template = createSlice({
  name: "template",
  initialState,
  reducers: {searchTemplate: searchTemplateCR},
  extraReducers:(builder) => {
      builder.addCase(getTemplates.pending, (state) => ({
        ...state,
        isGetTemplatesLoading: true,
      }));
      builder.addCase(getTemplates.fulfilled, (state, {payload}) => ({
        ...state,
        isGetTemplatesLoading: false,
        templateList: payload?.items!
      }));
      builder.addCase(getTemplates.rejected, (state) => ({
        ...state,
        isGetTemplatesLoading: false,
      }))
      builder.addCase(addNewTemplate.pending, (state) => ({
        ...state,
        isAddNewTemplateLoading: true,
      }));
      builder.addCase(addNewTemplate.fulfilled, (state, {payload}) => ({
        ...state,
        isAddNewTemplateLoading: false,
      }));
      builder.addCase(addNewTemplate.rejected, (state) => ({
        ...state,
        isAddNewTemplateLoading: false,
      }))
  },
});

export {getTemplates, addNewTemplate}

export const {searchTemplate} = template.actions;

export default template.reducer;
