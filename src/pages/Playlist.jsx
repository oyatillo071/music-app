import React, { useEffect, useState } from "react";
import { fetchDeezerPlaylist } from "../requests/request";

const Playlists = () => {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPlaylist() {
      const playlistId = "12345";
      try {
        const data = await fetchDeezerPlaylist(playlistId);
        console.log("Playlist data:", data);
        setPlaylist(data);
      } catch (err) {
        console.error("Error fetching playlist:", err);
        setError(err.message);
      }
    }

    getPlaylist();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Deezer Playlist</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {playlist ? (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={playlist.picture_medium}
              alt={playlist.title}
              className="w-24 h-24 rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-semibold">{playlist.title}</h2>
              {playlist.description && (
                <p className="text-gray-300">{playlist.description}</p>
              )}
            </div>
          </div>
          <ul className="space-y-4">
            {playlist.tracks?.data?.map((track) => (
              <li
                key={track.id}
                className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={track.album.cover_small}
                    alt={track.title}
                    className="w-16 h-16 rounded-lg"
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
                    <audio controls className="w-32" src={track.preview}>
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-300">Loading...</p>
      )}
    </div>
  );
};

export default Playlists;
