import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterModel } from "./../models/mui-data";
interface State {
  filter?: FilterModel;
}

const initialState: State = {
  filter: undefined,
};
type CR<T> = CaseReducer<State, PayloadAction<T>>;

const setFilterCR: CR<FilterModel | undefined> = (state, { payload }) => ({
  ...state,
  filter: payload,
});

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: { setFilter: setFilterCR },
});

export const { setFilter } = filter.actions;

export default filter.reducer;
