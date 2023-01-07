import { createSlice } from "@reduxjs/toolkit";
interface State {
  isSideBarVisible: boolean;
}

const initialState: State = {
  isSideBarVisible: false,
};

const uiControl = createSlice({
  name: "ui-control",
  initialState,
  reducers: {
    toggleSideBar: (state: State) => {
      state.isSideBarVisible = !state.isSideBarVisible;
    },
  },
});

export const {toggleSideBar} = uiControl.actions

export default uiControl.reducer;
