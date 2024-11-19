import React from "react";
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
  return (
    <>
      <div className="pt-[13px] pb-[10px]">
        <div className="flex items-center justify-between px-[28px]">
          {navigation.map((item) => (
            <button>
              <NavLink to={item.path} key={item.name} className="main-icons">
                {item.icon}
                <p>{item.name}</p>
              </NavLink>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
