import { getDownloadURL, StorageReference, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { Template, TemplateListResponse, AddNewTemplateArgs, TemplateArgs } from './../models/template';
import { templateServices } from './../services/template';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/notification";
import { handleError, handleSuccess } from "./notification";

interface State {
    isGetTemplatesLoading: boolean;
    templateList: Template[]
    isAddNewTemplateLoading: boolean
}

interface AddTemplateArgs{
  templateInfo: TemplateArgs,
  storageRef: StorageReference
  file: File
}

const ACTION_TYPE = 'template/'

const getTemplates = createAsyncThunk(`${ACTION_TYPE}getTemplates`, async (args, {dispatch}) => {
  try {
    const result = await templateServices.getTemplates()
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

const addNewTemplate = createAsyncThunk(`${ACTION_TYPE}addNewTemplate`, async (args: AddTemplateArgs, {dispatch}) => {
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

const initialState: State = {
    templateList: [],
    isGetTemplatesLoading: false,
    isAddNewTemplateLoading: false
};

const template = createSlice({
  name: "template",
  initialState,
  reducers: {},
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

export const {} = template.actions;

export default template.reducer;
