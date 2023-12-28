import { configureStore } from "@reduxjs/toolkit";
// configureStore - creates store - combines reducers
import userReducer from "./slices/userSlice"
import podcastReducer from "./slices/podcastSlice"

export default configureStore({
  reducer:{
    user:userReducer,
    podcasts:podcastReducer,
  }
  // here we are matching the reducers to its slices
})