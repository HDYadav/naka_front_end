import { createSlice } from "@reduxjs/toolkit";

const companyProfileSlice = createSlice({
    name: "profile",
    initialState: {
        addProfile: null,
    },
    reducers: {
        setProfile: (state, action) => {
            state.addProfile = action.payload;
        },
    },
});

export const { setProfile } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;
