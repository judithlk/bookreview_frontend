import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            {payload: {user, token}} : PayloadAction<{ user: any; token: string}>
        ) => {
            // console.log('from here...', state.token)
            // state.user = user
            // state.token = token
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(user));
            console.log(localStorage.getItem('userInfo'))
        }
    }
})

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
