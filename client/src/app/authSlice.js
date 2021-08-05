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
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
    },
    authLogout: (state, action) => {
      localStorage.clear();
    },
    locationPermission: (state, action) => {
      localStorage.setItem('locationAllowed', JSON.stringify({...action.payload}))
    }
  },
});

export const { isAuth, authLogout, locationPermission } = authSlice.actions;

export const selectAuth = (state) => state.auth.value;

export default authSlice.reducer;
