import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import {
  GetStatisticsDocument,
  StatisticsDocument,
  StatisticsTemplate,
  GetStatisticsTemplate,
  GetStatisticsDocumentList,
  GetStatisticsTemplateList,
  ArrangedStatistics,
} from "models/statistics";
import { statisticsServices } from "services/statistics";
import { handleError } from "slices/alert";

interface State {
  statisticsDocument?: StatisticsDocument;
  statisticsTemplate?: StatisticsTemplate;
  statisticsDocumentList: StatisticsDocument[];
  statisticsTemplateList: StatisticsTemplate[];
  isGetStatisticsDocumentLoading: boolean;
  isGetStatisticsTemplateLoading: boolean;
  isGetStatisticsDocumentListLoading: boolean;
  isGetStatisticsTemplateListLoading: boolean;
  arrangedDocumentStatistics?: ArrangedStatistics;
  arrangedTemplateStatistics?: ArrangedStatistics;
}

const initialState: State = {
  statisticsDocument: undefined,
  statisticsTemplate: undefined,
  statisticsDocumentList: [],
  statisticsTemplateList: [],
  isGetStatisticsDocumentLoading: false,
  isGetStatisticsTemplateLoading: false,
  isGetStatisticsDocumentListLoading: false,
  isGetStatisticsTemplateListLoading: false,
  arrangedDocumentStatistics: undefined,
  arrangedTemplateStatistics: undefined,
};

const ACTION_TYPE = "statistics/";

const getStatisticsDocument = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsDocument`,
  async (args: GetStatisticsDocument, { dispatch }) => {
    try {
      const result = await statisticsServices.getStatisticsDocument(args);
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
const getStatisticsDocumentList = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsDocumentList`,
  async (args: GetStatisticsDocumentList, { dispatch }) => {
    try {
      const result = await statisticsServices.getStatisticsDocumentList(args);
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

const getStatisticsTemplate = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsTemplate`,
  async (args: GetStatisticsTemplate, { dispatch }) => {
    try {
      const result = await statisticsServices.getStatisticsTemplate(args);
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
const getStatisticsTemplateList = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsTemplateList`,
  async (args: GetStatisticsTemplateList, { dispatch }) => {
    try {
      const result = await statisticsServices.getStatisticsTemplateList(args);
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

const statistics = createSlice({
  name: "Statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatisticsDocument.pending, (state) => ({
      ...state,
      isGetStatisticsDocumentLoading: true,
    }));
    builder.addCase(getStatisticsDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isGetStatisticsDocumentLoading: false,
      statisticsDocument: payload!,
    }));
    builder.addCase(getStatisticsDocument.rejected, (state) => ({
      ...state,
      isGetStatisticsDocumentLoading: false,
    }));
    builder.addCase(getStatisticsTemplate.pending, (state) => ({
      ...state,
      isGetStatisticsTemplateLoading: true,
    }));
    builder.addCase(getStatisticsTemplate.fulfilled, (state, { payload }) => ({
      ...state,
      isGetStatisticsTemplateLoading: false,
      statisticsTemplate: payload!,
    }));
    builder.addCase(getStatisticsTemplate.rejected, (state) => ({
      ...state,
      isGetStatisticsTemplateLoading: false,
    }));
    builder.addCase(getStatisticsDocumentList.pending, (state) => ({
      ...state,
      isGetStatisticsDocumentListLoading: true,
    }));
    builder.addCase(
      getStatisticsDocumentList.fulfilled,
      (state, { payload }) => {
        state.isGetStatisticsDocumentListLoading = false;
        const emptyStatistics: StatisticsDocument[] = payload.filter(statistics => !statistics.total)
        const noneEmptyStatistics: StatisticsDocument[] = payload.filter(statistics => statistics.total && statistics.departmentName !== 'All')
        const sortedStatisticsList: StatisticsDocument[] = [...noneEmptyStatistics, ...emptyStatistics]
        state.statisticsDocumentList = sortedStatisticsList;
        const approvedList: number[] = [],
          rejectedList: number[] = [],
          labels: string[] = [],
          processingList: number[] = [];
        sortedStatisticsList.forEach((statistics) => {
          approvedList.push(statistics.approved);
          rejectedList.push(statistics.rejected);
          processingList.push(statistics.processing);
          labels.push(statistics.departmentName);
        });
        state.arrangedDocumentStatistics = {
          approvedList,
          labels,
          processingList,
          rejectedList,
        };
      }
    );
    builder.addCase(getStatisticsDocumentList.rejected, (state) => ({
      ...state,
      isGetStatisticsDocumentListLoading: false,
    }));
    builder.addCase(getStatisticsTemplateList.pending, (state) => ({
      ...state,
      isGetStatisticsTemplateListLoading: true,
    }));
    builder.addCase(
      getStatisticsTemplateList.fulfilled,
      (state, { payload }) => {
        state.isGetStatisticsTemplateListLoading = false;
        const emptyStatistics: StatisticsTemplate[] = payload.filter(statistics => !statistics.total)
        const noneEmptyStatistics: StatisticsTemplate[] = payload.filter(statistics => statistics.total && statistics.departmentName !== 'All')
        const sortedStatisticsList: StatisticsTemplate[] = [...noneEmptyStatistics, ...emptyStatistics]
        state.statisticsTemplateList = sortedStatisticsList;
        const approvedList: number[] = [],
          rejectedList: number[] = [],
          labels: string[] = [],
          processingList: number[] = [];
        sortedStatisticsList.forEach((statistics) => {
          approvedList.push(statistics.approved);
          rejectedList.push(statistics.rejected);
          processingList.push(statistics.processing);
          labels.push(statistics.departmentName);
        });
        state.arrangedTemplateStatistics = {
          approvedList,
          labels,
          processingList,
          rejectedList,
        };
      }
    );
    builder.addCase(getStatisticsTemplateList.rejected, (state) => ({
      ...state,
      isGetStatisticsTemplateListLoading: false,
    }));
  },
});

export {
  getStatisticsDocument,
  getStatisticsTemplate,
  getStatisticsDocumentList,
  getStatisticsTemplateList,
};

export default statistics.reducer;
