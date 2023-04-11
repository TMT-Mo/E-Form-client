import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import { Statistics } from "models/statistics";
import { statisticsServices } from "services/statistics";
import { handleError } from "slices/alert";
import { getDepartmentList } from "slices/system";

interface State {
  statisticsDocumentOfDepartment?: Statistics;
  statisticsTemplateOfDepartment?: Statistics;
  statisticsDocumentOfUser?: Statistics;
  statisticsIncomingDocument?: Statistics;
  isGetStatisticsDocumentOfDepartment: boolean;
  isGetStatisticsTemplateOfDepartment: boolean;
  isGetStatisticsDocumentOfUser: boolean;
  isGetStatisticsIncomingDocument: boolean;
}

const initialState: State = {
  statisticsDocumentOfDepartment: undefined,
  statisticsTemplateOfDepartment: undefined,
  statisticsDocumentOfUser: undefined,
  statisticsIncomingDocument: undefined,
  isGetStatisticsDocumentOfDepartment: false,
  isGetStatisticsTemplateOfDepartment: false,
  isGetStatisticsDocumentOfUser: false,
  isGetStatisticsIncomingDocument: false,
};

const ACTION_TYPE = "statistics/";

const getStatisticsDocumentOfDepartment = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsDocumentOfDepartment`,
  async (_, { dispatch }) => {
    try {
      const result =
        await statisticsServices.getStatisticsDocumentOfDepartment();
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
    builder.addCase(getStatisticsDocumentOfDepartment.pending, (state) => ({
      ...state,
      isGetStatisticsDocumentOfDepartment: true,
    }));
    builder.addCase(
      getStatisticsDocumentOfDepartment.fulfilled,
      (state, { payload }) => ({
        ...state,
        isGetStatisticsDocumentOfDepartment: false,
        statisticsDocumentOfDepartment: payload!,
      })
    );
    builder.addCase(getStatisticsDocumentOfDepartment.rejected, (state) => ({
      ...state,
      isGetStatisticsDocumentOfDepartment: false,
    }));
  },
});

export default statistics.reducer;
