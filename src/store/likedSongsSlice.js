import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedSongs: [],
};

const likedSongsSlice = createSlice({
  name: "likedSongs",
  initialState,
  reducers: {
    addLikedSong: (state, action) => {
      const isSongLiked = state.likedSongs.some(
        (song) => song.id === action.payload.id
      );
      if (!isSongLiked) {
        state.likedSongs.push(action.payload);
      }
    },
    removeLikedSong: (state, action) => {
      state.likedSongs = state.likedSongs.filter(
        (song) => song.id !== action.payload.id
      );
    },
  },
});

export const { addLikedSong, removeLikedSong } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
