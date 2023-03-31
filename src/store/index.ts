import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducers from "slices";

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

// const combinedReducer = combineReducers({
//   ...appReducers,
// });
// export const rootReducer = (state: any, action: any) => {
//   if (action.type === 'Reset') {
//     state = undefined;
//     // localStorage.clear();
//   }
//   return combinedReducer(state, action);
// };

const store = configureStore({
  reducer: {
    ...appReducers,
  },
  middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
