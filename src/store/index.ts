import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducers from "../slices";

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  reducer: {
    ...appReducers,
  },
  middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
