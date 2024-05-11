import { createSlice } from "@reduxjs/toolkit";

const initialUserData = JSON.parse(localStorage.getItem("myUserData"));
const initialState = initialUserData ? initialUserData : null; 

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    addUser: (state, action) => {
      const addUserData = action.payload;
      localStorage.setItem("myUserData", JSON.stringify(addUserData));
      return addUserData;
    },
    removeUser: (state, action) => {
      localStorage.removeItem("myUserData");
      return null;
    } 
  },
});

export const { addUser, removeUser, resetUserData } = userSlice.actions;

export default userSlice.reducer;
