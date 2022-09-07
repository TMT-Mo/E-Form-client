import { QuestionResponse } from "./../models/questions";
import {
  createSlice,
  createAsyncThunk,
  // PayloadAction,
  // CaseReducer,
} from "@reduxjs/toolkit";
import {questionServices} from "../services/question";

interface State {
  getQuestionLoading: boolean;
  questionList: QuestionResponse[];
}

const initialState: State = {
  getQuestionLoading: false,
  questionList: [],
};

const getQuestionList = createAsyncThunk(`getQuestionList`, async () => {
  const result = await questionServices.getQuestionList();
  return result;
});

const question = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionList.pending, (state) => ({
      ...state,
      getQuestionLoading: true,
    }));
    builder.addCase(getQuestionList.fulfilled, (state, { payload }) => ({
      ...state,
      getQuestionLoading: false,
      questionList: payload,
    }));
    builder.addCase(getQuestionList.rejected, (state) => ({
      ...state,
      getQuestionLoading: false,
    }));
  },
});

export { getQuestionList };

export default question.reducer;
