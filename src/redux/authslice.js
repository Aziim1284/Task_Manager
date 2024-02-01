// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (state) => {
      console.log('signupRequest dispatched');
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      console.log('signupSuccess dispatched');
      state.loading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      console.log('signupFailure dispatched');
      state.loading = false;
      state.error = action.payload;
    },
    signinRequest: (state) => {
      console.log('signinRequest dispatched');
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      console.log('signinSuccess dispatched');
      state.loading = false;
      state.user = action.payload;
    },
    signinFailure: (state, action) => {
      console.log('signinFailure dispatched');
      state.loading = false;
      state.error = action.payload;
    },
    signout: (state) => {
      console.log('signout dispatched');
      state.user = null;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  signinRequest,
  signinSuccess,
  signinFailure,
  signout,
} = authSlice.actions;

export default authSlice.reducer;
