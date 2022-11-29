import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  locationIndex?: number;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const initialState: State = {
  locationIndex: undefined,
};

const setLocationCR: CR<State> = (state, { payload }) => ({
  ...state,
  locationIndex: payload.locationIndex,
});

const location = createSlice({
  name: "location",
  initialState,
  reducers: { setLocation: setLocationCR },
});

export const { setLocation } = location.actions;

export default location.reducer;
