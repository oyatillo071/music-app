import { useState, useEffect } from "react";
import getToken, { getPlaylists, getPlaylistsById } from "../requests/request";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export function HomePage() {
  const [playlists, setPlaylists] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [offset, setOffset] = useState(4);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        console.log("17qator home page", data);

        setPlaylists(data?.data?.categories?.items || []);
        setDisplayedCategories(data?.data?.categories?.items.slice(0, 4) || []);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const toggleCategories = () => {
    if (showAll) {
      setDisplayedCategories(playlists.slice(0, 4));
      setOffset(4);
    } else {
      const nextCategories = playlists.slice(offset, offset + 10);
      setDisplayedCategories((prevCategories) => [
        ...prevCategories,
        ...nextCategories,
      ]);
      setOffset(offset + 10);
    }
    setShowAll(!showAll);
  };

  const handleGetPlaylistsById = async (href) => {
    setLoading(true);
    try {
      const response = await getPlaylistsById(href);
      console.log("Playlist data:", response.data);
      alert("Playlist data fetched! Check the console for details.");
    } catch (error) {
      console.error("Failed to fetch playlist by ID:", error);
      alert("Failed to fetch playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 w-[1200px] min-h-screen pb-40"
      style={{
        background: "linear-gradient(180deg, #3333A3 5.09%, #121212 33.4%)",
      }}
    >
      <div className="flex gap-4">
        <div className="bg-[#191951] rounded-full">
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </div>
        <div className="bg-[#191951] rounded-full">
          <ChevronRightIcon className="text-white w-6 h-6" />
        </div>
      </div>
      <h2 className="text-4xl font-bold text-white mt-28 mb-6">
        Good afternoon
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-6">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[#3e3e84] flex items-center shadow-lg w-[479px] h-[82px] rounded-md overflow-hidden relative"
          >
            <img
              src={category.icons[0]?.url}
              alt={category.name}
              className="w-[82px] aspect-square object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
              <button
                onClick={() => handleGetPlaylistsById(category.href)}
                className="mt-2 text-white rounded"
                disabled={loading}
              >
                {loading ? "Loading..." : "Fetch Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold text-white mt-28 mb-6 ">
        Your top mixes
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-6 relative ">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] shadow-lg w-56 h-80 p-5 rounded-lg overflow-hidden relative"
          >
            <Link
              to="/"
              onClick={() => handleGetPlaylistsById(category.href)}
              className="absolute inset-0 z-10"
            ></Link>
            <img
              src={category.icons[0]?.url}
              alt={category.name}
              className="w-full h-[182px] object-cover"
            />
            <div className="p-4 relative z-20">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
              <h3 className="text-[#b3b3b3] font-medium text-lg">
                {category.name}
              </h3>
            </div>
          </div>
        ))}

        <div className="flex absolute -top-16 right-3 justify-center mt-6">
          <button
            onClick={toggleCategories}
            className="text-white z-50 text-[16px] font-bold"
          >
            {showAll ? "Hide" : "See All"}
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mt-28 mb-6 ">
        Made for you
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-6 relative ">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] shadow-lg w-56 h-80 p-5 rounded-lg overflow-hidden relative"
          >
            <Link
              to="/"
              onClick={() => handleGetPlaylistsById(category.href)}
              className="absolute inset-0 z-10"
            ></Link>
            <img
              src={category.icons[0]?.url}
              alt={category.name}
              className="w-full h-[182px] object-cover"
            />
            <div className="p-4 relative z-20">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
              <h3 className="text-[#b3b3b3] font-medium text-lg">
                {category.name}
              </h3>
            </div>
          </div>
        ))}

        <div className="flex absolute -top-16 right-3 justify-center mt-6">
          <button
            onClick={toggleCategories}
            className="text-white z-50 text-[16px] font-bold"
          >
            {showAll ? "Hide" : "See All"}
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mt-28 mb-6 ">
        Recently played
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-6 relative ">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] shadow-lg w-56 h-80 p-5 rounded-lg overflow-hidden relative"
          >
            <Link
              to="/"
              onClick={() => handleGetPlaylistsById(category.href)}
              className="absolute inset-0 z-10"
            ></Link>
            <img
              src={category.icons[0]?.url}
              alt={category.name}
              className="w-full h-[182px] object-cover"
            />
            <div className="p-4 relative z-20">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
              <h3 className="text-[#b3b3b3] font-medium text-lg">
                {category.name}
              </h3>
            </div>
          </div>
        ))}

        <div className="flex absolute -top-10 right-3 justify-center ">
          <button
            onClick={toggleCategories}
            className="text-white z-50 text-[16px] font-bold"
          >
            {showAll ? "Hide" : "See All"}
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mt-28 mb-6 ">
        Jump back in
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-6 relative ">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] shadow-lg w-56 h-80 p-5 rounded-lg overflow-hidden relative"
          >
            <Link
              to="/"
              onClick={() => handleGetPlaylistsById(category.href)}
              className="absolute inset-0 z-10"
            ></Link>
            <img
              src={category.icons[0]?.url}
              alt={category.name}
              className="w-full h-[182px] object-cover"
            />
            <div className="p-4 relative z-20">
              <h3 className="text-white font-bold text-xl">{category.name}</h3>
              <h3 className="text-[#b3b3b3] font-medium text-lg">
                {category.name}
              </h3>
            </div>
          </div>
        ))}

        <div className="flex absolute -top-16 right-3 justify-center mt-6">
          <button
            onClick={toggleCategories}
            className="text-white z-50 text-[16px] font-bold"
          >
            {showAll ? "Hide" : "See All"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
