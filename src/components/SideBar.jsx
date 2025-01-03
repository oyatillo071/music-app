import React, { useEffect, useState } from "react";
import HomeIcon from "../assets/home.svg";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import LibraryIcon from "../assets/library.svg";
import PlusIcon from "../assets/Plus.svg";
import LikeIcon from "../assets/liked.svg";
import { toast, Toaster } from "sonner";
import getToken, { getPlaylists } from "../requests/request";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        console.log(data);

        setPlaylists(data?.data?.categories?.items || []);
        setDisplayedCategories(data?.data?.categories?.items.slice(0, 4) || []);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="fixed top-0 w-80 left-0 z-50">
      <aside className="sidebar bg-black text-white  min-h-screen px-8 py-16">
        <Toaster />
        <ul>
          <NavLink
            to="/home"
            className="py-2 font-bold text-lg flex items-center gap-4"
          >
            <img src={HomeIcon} className="w-6 h-6" alt="home icon" /> Home
          </NavLink>
          <NavLink
            to="/"
            className="py-2 font-bold text-lg flex items-center gap-4"
          >
            <MagnifyingGlassIcon className="w-7 h-7 " /> Search
          </NavLink>

          <li className="py-2 font-bold text-lg flex items-center gap-4">
            <img src={LibraryIcon} className="w-8 h-8" alt="library icon" />{" "}
            Your Library
          </li>
        </ul>
        <button className=" text-white flex items-center gap-4 py-2 mt-12 rounded-lg">
          <img src={PlusIcon} className="w-8 h-8" alt="Plus icon" /> Create
          Playlist
        </button>
        <div className="mt-4">
          <NavLink
            to="/liked-songs"
            className="font-bold flex items-center gap-4"
          >
            <img src={LikeIcon} alt="like" /> Liked Songs
          </NavLink>
          <ul className="flex flex-col  items-left gap-5  mt-11 border-t pt-8 border-gray-500">
            {playlists.length > 0 &&
              playlists.map((value, index) => {
                return (
                  <li
                    key={index}
                    className="font-medium text-[#b3b3b3] text-lg"
                  >
                    {value.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
