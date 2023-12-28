// slice is a combination of action and state
// useSlice manages all the data related to the user (updating global variables)

import { createSlice } from "@reduxjs/toolkit";
// the above should be called to create a slice

const initialState = {
  user: null,
  // this is the name of the object
};
// above is similar to decalring a variable

const userSlice = createSlice({
  name: "user",
  // this is similar to nameing the variable
  // this is the name of the slice
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  // state and action are inbuilt functions
  // state.user is the user object
  // action.payload contains the data
});

export const { setUser, clearUser } = userSlice.actions;
// exporting actions to use setUser and clearUser
export default userSlice.reducer;
// exporting the reducer (used in store)
