import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayIcon } from "@radix-ui/react-icons";
import { setTrack } from "../store/musicSlice";

const LikedSongsPage = () => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const audioRef = useRef(null);

  const handlePlayTrack = (previewUrl, albumImage, duration, artist, title) => {
    dispatch(
      setTrack({
        track: previewUrl,
        image: albumImage,
        duration,
        artist,
        title,
      })
    );
    audioRef.current.play();
  };

  return (
    <div className="bg-gray-900 min-h-screen ml-40 p-6 w-[1300px] text-white ">
      <h2 className="text-2xl mb-5">Liked Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {likedSongs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md group relative overflow-hidden"
          >
            <img
              src={song.albumImage}
              alt={song.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h4 className="text-lg font-medium">{song.title}</h4>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <button
              onClick={() => {
                if (song.artist && song.artist.name) {
                  handlePlayTrack(
                    song.preview,
                    song.albumImage,
                    song.duration,
                    song.artist,
                    song.title
                  );
                }
              }}
              className="bg-green-500 text-white px-4 py-2 absolute -bottom-full left-[40%] group-hover:bottom-[60%] transition-all ease-in-out duration-1000 rounded-md hover:bg-green-600"
            >
              <PlayIcon />
            </button>
          </div>
        ))}
      </div>
      {/* <audio ref={audioRef} /> */}
    </div>
  );
};

export default LikedSongsPage;
