import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//Icon(s)
import {
  HomeIcon,
  FaithIcon,
  TaskIcon,
  CrossIcon,
  LeaderBoardIcon,
  FriendsIcon,
} from "../Icons/Icons";

const navigation = [
  { name: "Home", path: "/app/page-1", icon: <HomeIcon /> },
  { name: "Faith", path: "/app/page-2", icon: <FaithIcon /> },
  { name: "Task", path: "/app/page-3", icon: <TaskIcon /> },
  { name: "ChristAI", path: "/app/page-4", icon: <CrossIcon /> },
  { name: "Friends", path: "/app/page-5", icon: <FriendsIcon /> },
];

const BottomNav = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleSpecialClick = (e, name) => {
    e.preventDefault();
    // Get the position of the clicked icon
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopup(name);
    setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
  };

  return (
    <>
      <div className="pt-[13px] pb-[10px]">
        <div className="flex items-center justify-between px-[28px]">
          {navigation.map((item) => {
            if (item.name === "Faith" || item.name === "ChristAI") {
              return (
                <button
                  key={item.name}
                  onClick={(e) => handleSpecialClick(e, item.name)}
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
          <div
            className="message-bubble"
            style={{
              position: "absolute",
              top: popupPosition.top - 100,
              left: popupPosition.left,
              transform: "translateX(-50%)", // Center the popup horizontally
              marginTop: "10px", // Add some margin to position it below the icon
            }}
          >
            {showPopup === "Faith"
              ? "Faith Coming Soon"
              : "CristAI Coming Soon"}
          </div>
        )}
      </div>
    </>
  );
};

export default BottomNav;
