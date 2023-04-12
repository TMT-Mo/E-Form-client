import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ValidationErrors } from "models/alert";
import { StatisticsDocument, StatisticsTemplate } from "models/statistics";
import { statisticsServices } from "services/statistics";
import { handleError } from "slices/alert";

interface State {
  statisticsDocument: StatisticsDocument[];
  statisticsTemplate: StatisticsTemplate[];
  // statisticsDocumentOfUser?: Statistics;
  // statisticsIncomingDocument?: Statistics;
  isGetStatisticsDocument: boolean;
  isGetStatisticsTemplate: boolean;
  // isGetStatisticsDocumentOfUser: boolean;
  // isGetStatisticsIncomingDocument: boolean;
}

const initialState: State = {
  statisticsDocument: [],
  statisticsTemplate: [],
  // statisticsDocumentOfUser: undefined,
  // statisticsIncomingDocument: undefined,
  isGetStatisticsDocument: false,
  isGetStatisticsTemplate: false,
  // isGetStatisticsDocumentOfUser: false,
  // isGetStatisticsIncomingDocument: false,
};

const ACTION_TYPE = "statistics/";

const getStatisticsDocument = createAsyncThunk(
  `${ACTION_TYPE}getStatisticsDocument`,
  async (_, { dispatch }) => {
    try {
      const result = await statisticsServices.getStatisticsDocument();
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
      isGetStatisticsDocument: true,
    }));
    builder.addCase(getStatisticsDocument.fulfilled, (state, { payload }) => ({
      ...state,
      isGetStatisticsDocument: false,
      statisticsDocument: payload!,
    }));
    builder.addCase(getStatisticsDocument.rejected, (state) => ({
      ...state,
      isGetStatisticsDocument: false,
    }));
  },
});

export default statistics.reducer;
