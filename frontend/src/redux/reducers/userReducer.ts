import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface AppState {
  email: string | null;
}

const initialState: AppState = {
  email: null,
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
  },
});

export const { authUser, logout } = authSlice.actions;
export const authReducer: Reducer<AppState> = authSlice.reducer;