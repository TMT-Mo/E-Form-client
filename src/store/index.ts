import { configureStore } from "@reduxjs/toolkit";
import appReducers from "../slices";

const store = configureStore({
  reducer: {
    ...appReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
