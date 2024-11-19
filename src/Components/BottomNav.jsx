import React from "react";

//Icon(s)
import {
  HomeIcon,
  FaithIcon,
  TaskIcon,
  LeaderBoardIcon,
  FriendsIcon,
} from "../Icons/Icons";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <>
      <div className="pt-[13px] pb-[10px]">
        <div className="flex items-center justify-between  px-[28px]">
          <NavLink to="/app/page-1" >
            <button className="main-icons">
              <HomeIcon />
              <p>Home</p>
            </button>
          </NavLink>
          <NavLink to="/app/page-2">
            <button className="main-icons">
              <FaithIcon />
              <p>Faith</p>
            </button>
          </NavLink>
          <NavLink to="/app/page-3">
            <button className="main-icons">
              <TaskIcon />
              <p>Task</p>
            </button>
          </NavLink>
          <NavLink to="/app/page-4">
            <button className="main-icons">
              <LeaderBoardIcon />
              <p>Leaderboard</p>
            </button>
          </NavLink>
          <NavLink to="/app/page-5">
            <button className="main-icons">
              <FriendsIcon />
              <p>Friends</p>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
