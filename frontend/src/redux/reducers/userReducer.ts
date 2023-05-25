import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface AppState {
  email: string | null;
  session: {
    searchTerm: string,
    sortBy: string,
    direction: string,
  };
  selected: number[]
}

const initialState: AppState = {
  email: null,
  session : {
    searchTerm: '',
    sortBy: "id",
    direction: 'asc'
  },
  selected: []
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
    authSelected: (state, action) => {
      state.selected = [...action.payload];
    },
  },
});

export const { authUser, logout, authSession, authSelected } = authSlice.actions;
export const authReducer: Reducer<AppState> = authSlice.reducer;