import React from "react";
import { friends } from "../constants/constants";
import { Cross1Icon, PersonIcon } from "@radix-ui/react-icons";
import FriendPerson from "../assets/Union.svg";
export default function SettingBar() {
  return (
    <div className="fixed right-0 top-0">
      <div className="px-6 py-8 bg-black relative text-white min-h-screen shadow-md w-[346px] h-full">
        <PersonIcon className="absolute top-10 right-14" />

        <Cross1Icon className="absolute top-10 right-6" />

        <h2 className="text-xl font-bold mb-4 text-[#ccc]">Friend Activity</h2>
        <p className="text-lg font-medium text-[#ccc] mb-6">
          Let friends and followers on Spotify see what you're listening to.
        </p>
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#3f4135] rounded-full px-3 py-1 after:bg-blue-500 after:top-1 relative after:border-black after:border after:-right-1 after:absolute after:w-3 after:h-3 after:rounded-full flex items-center justify-center text-xl font-bold text-gray-200">
                <img src={FriendPerson} alt="person icon" />
              </div>
              <div>
                <p className="text-sm font-medium">{friend.name}</p>
                <p className="text-xs text-gray-400">{friend.activity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-sm justify-center text-gray-400">
          <p className="mb-4 font-medium text-[#ccc] text-lg">
            Go to Settings &gt; Social and enable "Share my listening activity
            on Spotify." You can turn this off at any time.
          </p>
          <button className="px-20  py-4 bg-white ml-4  text-black rounded-[40px] font-bold">
            SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
}
