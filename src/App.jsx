import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";
import LikedSongsPage from "./pages/Like.jsx";

function App() {
  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Search />} />
          <Route path="/liked-songs" element={<LikedSongsPage />} />
          <Route path="/playlists" element={<Playlist />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
