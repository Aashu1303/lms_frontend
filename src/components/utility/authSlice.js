import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('authToken') || null,
    userId: localStorage.getItem('userId') || null,
    isLoggedIn: false,
    isLoading: false, // Make sure this is here
    errorMessage: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.errorMessage = null;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem('authToken', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
        },
        loginFailure(state, action) {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.token = null;
            state.userId = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
