import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import appReducers from "../slices/index";
const middleware = getDefaultMiddleware({
  thunk: true,
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  reducer: {
    ...appReducers,
  },
  middleware,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
