import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./companyProfileSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer, 
    profile:profileReducer,
  },
});

export default appStore;