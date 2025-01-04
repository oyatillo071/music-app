import React, { useState } from "react";
import Aside from "../components/SideBar";
import AsideSetting from "../components/SettingBar";
import MusicPlayer from "../components/MusicPlayer";
import { toast, Toaster, useSonner } from "sonner";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const closeWindow = () => {
    window.open(location.href, "_self", "");
    window.close();
  };
  const [isAdultUser, setIsAdultUser] = useState(false);
  if (isAdultUser) {
    return (
      <div className="flex h-screen justify-between w-full bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <Aside />
        {/* Main Content */}
        <main className="flex  p-6 bg-gray-900 min-h-screen w-full justify-center relative ">
          <div className="pb-40">
            {children}
            <MusicPlayer />
          </div>
        </main>

        {/* Settings Bar */}
        <AsideSetting />
      </div>
    );
  } else {
    return (
      <div className="w-[400px] bg-gray-600 mx-auto container h-[250px] gap-10 rounded-md flex items-center mt-[200px] flex-col p-6">
        <Toaster />
        <h1 className="text-white font-extrabold text-xl">
          This site can only be visited by those who have reached the age of
          majority. Are you 18 years old?
        </h1>
        <div className="flex items-center gap-6">
          <button
            className="bg-white text-black px-3 py-1 rounded-md hover:bg-green-400 hover:text-black"
            onClick={() => {
              toast.success(
                "Congratulations on being able to access this platform! Thank you for your cooperation."
              );
              setIsAdultUser(true);
            }}
          >
            Yes
          </button>
          <button
            className="bg-white text-black px-3 py-1 rounded-md hover:bg-red-400 hover:text-black"
            onClick={() => {
              toast.info(
                "Unfortunately, according to the law, you are not allowed to use this platform due to age restrictions. "
              );
              setTimeout(
                () => {
                  window.open(
                    "https://uza.uz/oz/posts/yei-18-saytlarni-cheklamoqchi_652005",
                    "_blank"
                  );
                },

                1000
              );
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
};

export default MainLayout;
