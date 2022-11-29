import { Template, TemplateListResponse } from './../models/templates';
import { templateServices } from './../services/template';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "../models/notification";
import { handleError } from "./notification";

interface State {
    isGetTemplatesLoading: boolean;
    templateList: Template[]
}

const getTemplates = createAsyncThunk(`getTemplates`, async (args, {dispatch}) => {
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



const initialState: State = {
    templateList: [],
    isGetTemplatesLoading: false
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
  },
});

export {getTemplates}

export const {} = template.actions;

export default template.reducer;
