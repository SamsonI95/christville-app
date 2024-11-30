import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//Icon(s)
import {
  HomeIcon,
  FaithIcon,
  TaskIcon,
  LeaderBoardIcon,
  FriendsIcon,
} from "../Icons/Icons";

const navigation = [
  { name: "Home", path: "/app/page-1", icon: <HomeIcon /> },
  { name: "Faith", path: "/app/page-2", icon: <FaithIcon /> },
  { name: "Task", path: "/app/page-3", icon: <TaskIcon /> },
  { name: "Leaderboard", path: "/app/page-4", icon: <LeaderBoardIcon /> },
  { name: "Friends", path: "/app/page-5", icon: <FriendsIcon /> },
];

const BottomNav = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleFaithClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
  };
  return (
    <>
      <div className="pt-[13px] pb-[10px]">
        <div className="flex items-center justify-between px-[28px]">
          {navigation.map((item) => {
            if (item.name === "Faith") {
              return (
                <button
                  key={item.name}
                  onClick={handleFaithClick}
                  className="main-icons"
                >
                  {item.icon}
                  <p>{item.name}</p>
                </button>
              );
            }
            return (
              <button key={item.name}>
                <NavLink to={item.path} className="main-icons">
                  {item.icon}
                  <p>{item.name}</p>
                </NavLink>
              </button>
            );
          })}
        </div>

        {showPopup && (
          <div className="message-bubble">
            Coming Soon
          </div>
        )}
      </div>
    </>
  );
};

export default BottomNav;
