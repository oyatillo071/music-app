import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { PlayIcon } from "@radix-ui/react-icons";
import { setTrack } from "../store/musicSlice";
import { fetchDeezerSearch } from "../requests/request";
import { artistsList } from "../constants/constants";
import PlayIconbutton from "../assets/playIcon.svg";
const Search = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const audioRef = useRef(null);
  const dispatch = useDispatch();

  async function getTracks() {
    if (!searchItem) {
      const randomIndex = Math.floor(Math.random() * artistsList.length);
      const randomArtist = artistsList[randomIndex];
      setSearchItem(randomArtist.name);
    }

    try {
      const data = await fetchDeezerSearch(searchItem);
      if (data && data.data && data.data.length > 0) {
        setTracks(data.data);
        setError(null);
      } else {
        setTracks([]);
        setError("No tracks found.");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getTracks();
  }, [isSearch, searchItem]);

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
    <div className="bg-gray-900 min-h-screen ml-40 pb-40 p-6 w-[1300px] text-white">
      <div className="mb-6">
        <input
          type="text"
          placeholder={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white w-full md:w-1/2"
        />
      </div>
      {error && (
        <p className="text-red-500">
          Error: {error} <br />
          Please refresh page or try again
        </p>
      )}
      {tracks.length > 0 ? (
        <div className="flex flex-wrap items-center gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-800 p-4 flex flex-wrap items-center gap-5 rounded-lg shadow hover:bg-gray-700 transition overflow-hidden group"
            >
              <div className="flex flex-col relative w-[310px] gap-5 items-center">
                <img
                  src={track.album.cover_big}
                  alt={track.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{track.title}</p>
                  <p className="text-gray-400">
                    by{" "}
                    <a
                      href={track.artist.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {track.artist.name}
                    </a>
                  </p>
                </div>
                {track.preview && (
                  <button
                    onClick={() => {
                      handlePlayTrack(
                        track.preview,
                        track.album.cover_big,
                        track.duration,
                        track.artist.name,
                        track.title
                      );
                    }}
                    className=" absolute  top-[55%] hidden group-hover:flex transition-all ease-in-out duration-1000 rounded-md "
                  >
                    <img src={PlayIconbutton} alt="" width={80} height={80} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <p className="text-gray-400">Loading...</p>
      )}

      <audio ref={audioRef} />
    </div>
  );
};

export default Search;
