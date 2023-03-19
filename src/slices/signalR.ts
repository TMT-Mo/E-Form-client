import { HubConnection } from '@microsoft/signalr';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    connection: HubConnection | null;
  }
  
  type CR<T> = CaseReducer<State, PayloadAction<T>>;
  
//   const ACTION_TYPE = "notification/";
  
  const initialState: State = {
    connection: null
  };

  const setHubConnectionCR: CR<{ incomingConnection: HubConnection }> = (state, { payload }) => ({
    ...state,
    connection: payload.incomingConnection
  });

const signalR = createSlice({
    name: 'Signal R',
    initialState,
    reducers: {setHubConnection: setHubConnectionCR}
})

export const {setHubConnection} = signalR.actions

export default signalR.reducer 