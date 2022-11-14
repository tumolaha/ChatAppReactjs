import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        logOut: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        //register
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        //logout
        logOutStart: (state) => {
            state.logOut.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.logOut.isFetching = false;
            state.login.currentUser = null;
            state.logOut.error = false;
        },
        logOutFailed: (state) => {
            state.logOut.isFetching = false;
            state.logOut.error = true;
        },
        editProfile: (state, action) => {
            state.login.currentUser = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerFailed,
    registerSuccess,
    logOutSuccess,
    logOutStart,
    logOutFailed,
    editProfile,
} = authSlice.actions;

export default authSlice.reducer;
