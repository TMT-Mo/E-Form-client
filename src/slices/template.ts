import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  Template,
  GetTemplateArgs,
  AddTemplateToFirebaseArgs,
  EnableTemplateArgs,
  ApproveTemplateArgs,
} from "models/template";
import { templateServices } from "services/template";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import { handleError, handleSuccess } from "./alert";

interface State {
  isGetTemplatesLoading: boolean;
  templateList: Template[];
  isAddNewTemplateLoading: boolean;
  searchItemValue?: string;
  total?: number;
  size?: number;
  currentPage: number;
  templateDetail?: Template;
  isEnableTemplateLoading: boolean;
  isApproveTemplateLoading: boolean;
}

const initialState: State = {
  templateList: [],
  isGetTemplatesLoading: false,
  isAddNewTemplateLoading: false,
  searchItemValue: undefined,
  total: undefined,
  size: 10,
  currentPage: 0,
  templateDetail: undefined,
  isEnableTemplateLoading: false,
  isApproveTemplateLoading: false,
};

const ACTION_TYPE = "template/";

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const searchTemplateCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value,
  currentPage: 0,
});

const onChangeTemplatePageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

const getTemplateDetailCR: CR<{ template: Template }> = (
  state,
  { payload }
) => ({
  ...state,
  templateDetail: payload.template!,
});

const updateTemplateCR: CR<{ id: number; isEnable: boolean }> = (
  state,
  { payload }
) => {
  state.templateList.forEach(function (value, index) {
    if (value.id === payload.id) {
      value.isEnable = payload.isEnable;
    }
  });
};

const getTemplates = createAsyncThunk(
  `${ACTION_TYPE}getTemplates`,
  async (args: GetTemplateArgs, { dispatch }) => {
    try {
      const result = await templateServices.getTemplates(args)
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response?.data) {
        dispatch(handleError({ errorMessage: err.message }));
        return;
      }
      const errorMessage = (err.response?.data as ValidationErrors)
        .errorMessage;
      // if(errorMessage === 'Unauthorized'){
      //   window.location = '/login' as unknown as Location
      //   helpers.clearToken()
      // }
      dispatch(
        handleError({
          errorMessage,
        })
      );

      // throw err;
    }
  }
);

const enableTemplate = createAsyncThunk(
  `${ACTION_TYPE}enableTemplate`,
  async (args: EnableTemplateArgs, { dispatch }) => {
    try {
      const result = await templateServices.enableTemplate({
        ...args,
      });
      dispatch(updateTemplate({ ...args }));
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

const addNewTemplate = createAsyncThunk(
  `${ACTION_TYPE}addNewTemplate`,
  async (args: AddTemplateToFirebaseArgs, { dispatch }) => {
    let url
    try {
      const uploadTask = await uploadBytesResumable(args.storageRef, args.file);
      url = await getDownloadURL(uploadTask.ref);
    } catch (error) {
      dispatch(handleError({ errorMessage: "Something went wrong with input file!" }));
      throw error;
    }
    try {
      
      const result = await templateServices.addNewTemplate({
        ...args.templateInfo,
        link: url,
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

const approveTemplate = createAsyncThunk(
  `${ACTION_TYPE}approveTemplate`,
  async (args: ApproveTemplateArgs, { dispatch }) => {
    try {
      const result = await templateServices.approveTemplate({
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

const template = createSlice({
  name: "template",
  initialState,
  reducers: {
    searchTemplate: searchTemplateCR,
    onChangeTemplatePage: onChangeTemplatePageCR,
    clearTemplates: (state: State) => ({
      ...state,
      templateList: [],
      searchItemValue: undefined,
      filter: undefined,
      total: undefined,
      size: 10,
      currentPage: 0,
    }),
    clearTemplatePagination: (state: State) => ({
      ...state,
      currentPage: 0,
    }),
    getTemplateDetail: getTemplateDetailCR,
    updateTemplate: updateTemplateCR,
    clearTemplateDetail: (state: State) => ({
      ...state,
      templateDetail: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplates.pending, (state) => ({
      ...state,
      isGetTemplatesLoading: true,
    }));
    builder.addCase(getTemplates.fulfilled, (state, { payload }) => ({
      ...state,
      isGetTemplatesLoading: false,
      templateList: payload?.items!,
      total: payload?.total!,
    }));
    builder.addCase(getTemplates.rejected, (state) => {
      if (state.isGetTemplatesLoading) return; //* Handle api abort
      return {
        ...state,
        isGetTemplatesLoading: false,
      };
    });
    builder.addCase(addNewTemplate.pending, (state) => ({
      ...state,
      isAddNewTemplateLoading: true,
    }));
    builder.addCase(addNewTemplate.fulfilled, (state, { payload }) => ({
      ...state,
      isAddNewTemplateLoading: false,
    }));
    builder.addCase(addNewTemplate.rejected, (state) => ({
      ...state,
      isAddNewTemplateLoading: false,
    }));
    builder.addCase(enableTemplate.pending, (state) => ({
      ...state,
      isEnableTemplateLoading: true,
    }));
    builder.addCase(enableTemplate.fulfilled, (state, { payload }) => ({
      ...state,
      isEnableTemplateLoading: false,
      templateDetail: undefined,
    }));
    builder.addCase(enableTemplate.rejected, (state) => ({
      ...state,
      isEnableTemplateLoading: false,
    }));
    builder.addCase(approveTemplate.pending, (state) => ({
      ...state,
      isApproveTemplateLoading: true,
    }));
    builder.addCase(approveTemplate.fulfilled, (state, { payload }) => ({
      ...state,
      isApproveTemplateLoading: false,
    }));
    builder.addCase(approveTemplate.rejected, (state) => ({
      ...state,
      isApproveTemplateLoading: false,
    }));
  },
});

export { getTemplates, addNewTemplate, enableTemplate, approveTemplate };

export const {
  searchTemplate,
  onChangeTemplatePage,
  clearTemplates,
  getTemplateDetail,
  updateTemplate,
  clearTemplateDetail,
  clearTemplatePagination,
} = template.actions;

export default template.reducer;
