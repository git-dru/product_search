import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface AppState {
  email: string | null;
  session: {
    searchTerm: string,
    sortBy: string,
    direction: string,
  };
}

const initialState: AppState = {
  email: null,
  session : {
    searchTerm: '',
    sortBy: "id",
    direction: 'asc'
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = null;
    },
    authSession: (state, action) => {
      state.session = {...state.session, ...action.payload};
    },
  },
});

export const { authUser, logout, authSession } = authSlice.actions;
export const authReducer: Reducer<AppState> = authSlice.reducer;