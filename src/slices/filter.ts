import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterModel, SorterModel } from "./../models/mui-data";
interface State {
  filter?: FilterModel;
  sorter?: SorterModel;
}

const initialState: State = {
  filter: undefined,
  sorter: undefined
};
type CR<T> = CaseReducer<State, PayloadAction<T>>;

const setFilterCR: CR<FilterModel | undefined> = (state, { payload }) => ({
  ...state,
  filter: payload,
});

const setSorterCR: CR<SorterModel | undefined> = (
  state,
  { payload }
) => ({
  ...state,
  sorter: payload,
});

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: setFilterCR,
    setSorter: setSorterCR,
    clearFilter: (state: State) => {
      state.filter = undefined;
      state.sorter = undefined
    },
    
  },
});

export const { setFilter, clearFilter, setSorter } = filter.actions;

export default filter.reducer;
