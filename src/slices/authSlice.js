import { createSlice } from "@reduxjs/toolkit";

// ye mujhe help karega jab me retutn hunga tab sab data milega
const tokenFromStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  signupData: null,
  token: tokenFromStorage,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.signupData = null;
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setSignupData,
  setToken,
  setUser,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
