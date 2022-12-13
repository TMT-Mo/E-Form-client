import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  totalPages?: number;
  currentPage: number;
}

const initialState: State = {
  currentPage: 0,
  totalPages: undefined,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const setPaginationCR: CR<State> = (state, {payload}) => ({
    ...state,
    totalPages: payload.totalPages,
    currentPage: payload.currentPage
})

const onChangePageCR: CR<{selectedPage: number}> = (state, {payload}) => ({
    ...state,
    currentPage: payload.selectedPage!
})

const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: setPaginationCR,
    onChangePage: onChangePageCR
  },
});

export const {onChangePage, setPagination} = pagination.actions
export default pagination.reducer
