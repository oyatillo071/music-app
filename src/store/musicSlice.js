import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  albumImage: null,
  duration: 0,
  title: null,
  artistName: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setTrack: (state, action) => {
      state.currentTrack = action.payload.track;
      state.albumImage = action.payload.image;
      state.duration = action.payload.duration || 0;
      console.log(
        action.payload,

        "setTrack log"
      );

      state.title = action.payload.title || "title";
      state.artist = action.payload.artist || "artist";
    },
    resetTrack: (state) => {
      state.currentTrack = null;
      state.albumImage = null;
      state.duration = 0;
      state.title = null;
      state.artistName = null;
    },
  },
});

export const { setTrack, resetTrack } = musicSlice.actions;
export default musicSlice.reducer;
