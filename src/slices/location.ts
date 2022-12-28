import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewerLocationIndex } from "../utils/constants";

interface State {
  locationIndex?: number;
  viewerLocationIndex?: number;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const initialState: State = {
  locationIndex: undefined,
  viewerLocationIndex: undefined,
};

const setLocationCR: CR<State> = (state, { payload }) => ({
  ...state,
  locationIndex: payload.locationIndex,
});

const setViewerLocationCR: CR<{viewerLocationIndex: ViewerLocationIndex}> = (state, { payload }) => ({
  ...state,
  viewerLocationIndex: payload.viewerLocationIndex,
});

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: setLocationCR,
    setViewerLocation: setViewerLocationCR,
  },
});

export const { setLocation, setViewerLocation } = location.actions;

export default location.reducer;
