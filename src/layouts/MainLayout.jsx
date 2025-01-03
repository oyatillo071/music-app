import React from "react";
import Aside from "../components/SideBar";
import AsideSetting from "../components/SettingBar";
import MusicPlayer from "../components/MusicPlayer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen justify-between w-full bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <Aside />
      {/* Main Content */}
      <main className="flex  p-6 bg-gray-900 min-h-screen w-full justify-center relative ">
        <div>
          {children}
          <MusicPlayer />
        </div>
      </main>

      {/* Settings Bar */}
      <AsideSetting />
    </div>
  );
};

export default MainLayout;
