import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
      allUser: null 
  },
  reducers: {
    addAllUserData: (state, action) => {
      state.allUser = action.payload;
    },
  },
});


export const { addAllUserData} = userDataSlice.actions;

export default userDataSlice.reducer;