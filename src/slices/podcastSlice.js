import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
  // this is the name of the object
};
// above is similar to decalring a variable

const podcastSlice = createSlice({
  name: "podcasts",
  // this is similar to nameing the variable
  // this is the name of the slice
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
  },
  // state and action are inbuilt functions
  // state.user is the user object
  // action.payload contains the data
});

export const { setPodcasts } = podcastSlice.actions;
// exporting actions to use setUser and clearUser
export default podcastSlice.reducer;
// exporting the reducer (used in store)
