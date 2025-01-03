import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Icons from "@radix-ui/react-icons";
import { addLikedSong, removeLikedSong } from "../store/likedSongsSlice";

const MusicPlayer = () => {
  const [isOpenImg, setIsOpenImg] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);

  const { currentTrack, albumImage, duration, artist, title, id } = useSelector(
    (state) => state.music
  );
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  // Track if the current song is liked
  const isSongLiked = likedSongs.some((song) => song.id === id);

  const toggleLike = () => {
    if (isSongLiked) {
      dispatch(removeLikedSong({ id }));
    } else {
      dispatch(
        addLikedSong({
          id,
          title,
          artist,
          albumImage,
          preview: currentTrack,
        })
      );
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time when the audio is playing
  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [isPlaying]);

  // Handle the volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  return (
    <div className="bg-[#181818] text-white fixed bottom-0 left-0 w-full h-24 flex z-50 items-center px-10 gap-10 justify-between">
      {isOpenImg && (
        <img
          src={albumImage ? albumImage : "../assets/playImg.png"}
          alt="img"
          className="absolute z-40 w-[310px] h-80 bottom-[90px] object-contain left-0"
        />
      )}
      {isOpenImg && (
        <Icons.CaretDownIcon
          className="absolute z-50 w-10 h-10 bottom-[350px] object-contain left-64"
          onClick={() => setIsOpenImg(false)}
        />
      )}
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center gap-6">
          <div>
            <h4 className="text-sm font-medium">{title}</h4>
            <h2 className="text-xs text-[#A6A6A6]">{artist}</h2>
          </div>
          <div className="flex">
            {!isOpenImg && (
              <img src={albumImage} alt="img" className="w-[80px] h-[80px]" />
            )}
            {!isOpenImg && (
              <Icons.CaretUpIcon
                className="w-10 h-10"
                onClick={() => setIsOpenImg(true)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-2xl">
        <div className="flex items-center space-x-6 mb-2">
          <Icons.ShuffleIcon />
          <div className="bg-gray-700 text-white p-2 rounded-full cursor-pointer">
            {isPlaying ? (
              <Icons.PauseIcon onClick={togglePlayPause} />
            ) : (
              <Icons.PlayIcon onClick={togglePlayPause} />
            )}
          </div>
          <Icons.LoopIcon />
        </div>

        <div className="flex items-center space-x-2 w-full px-4">
          <span className="text-xs">
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, "0")}
          </span>
          <input
            type="range"
            className="w-full bg-gray-600 h-1 rounded-3xl cursor-pointer"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
          />
          <span className="text-xs">
            {Math.floor(duration / 60)}:
            {String(Math.floor(duration % 60)).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 w-1/8 rounded-md">
        <div
          onClick={toggleLike}
          className={`bg-gray-700 p-2 rounded-full cursor-pointer ${
            isSongLiked ? "bg-red-500" : "bg-gray-700"
          }`}
        >
          {isSongLiked ? (
            <Icons.HeartFilledIcon className="text-white" />
          ) : (
            <Icons.HeartIcon className="text-white" />
          )}
        </div>
        <input
          type="range"
          className="w-full bg-gray-600 h-1 rounded-lg cursor-pointer"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      <audio ref={audioRef} src={currentTrack} />
    </div>
  );
};

export default MusicPlayer;
