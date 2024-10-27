import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("ODL-LLM-USER")) || {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;