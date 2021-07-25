import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
    //   state.value = action.payload
    localStorage.setItem('profile', JSON.stringify({...action?.payload}))
    },
    authLogout: (state, action) => {
        localStorage.clear()
    }
  },
});

export const {isAuth, authLogout} = authSlice.actions;

export const selectAuth = state => state.auth.value;

export default authSlice.reducer;
