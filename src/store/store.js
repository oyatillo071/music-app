// store.js
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicSlice.js";
import likedSongsReducer from "./likedSongsSlice.js";
const store = configureStore({
  reducer: {
    music: musicReducer,
    likedSongs: likedSongsReducer,
  },
});

export default store;
