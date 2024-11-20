import React from "react";
import { NavLink, useLocation } from "react-router-dom";

//Icon(s)
import { ThunderboltIcon } from "../Icons/Icons";

const TopLayer = () => {
  const location = useLocation();

  const isFaithPage = location.pathname.startsWith("/app/page-2");

  return (
    <div className="flex flex-col items-center justify-between pt-[50px] gap-4">
      <section className="flex items-center justify-between w-full">
        <section>Today</section>
        <section className="flex items-center gap-2">
          <div className="flex">
            <ThunderboltIcon />
            <p>1</p>
          </div>
          <div className="border border-black bg-black w-5 h-5 rounded-full"></div>
        </section>
      </section>
      <section className="flex items-center justify-between w-full">
        {isFaithPage ? (
          <div className="flex gap-4 faith-page-link">
            <NavLink
              to="/app/page-2/games"
              className={({ isActive }) =>
                `faith-page-link ${isActive ? "active" : ""}`
              }
            >
              Games
            </NavLink>
            <NavLink
              to="/app/page-2/prayer-wall"
              className={({ isActive }) =>
                `faith-page-link ${isActive ? "active" : ""}`
              }
            >
              Prayer Wall
            </NavLink>
          </div>
        ) : (
          <h3>Daily verse</h3>
        )}
        <div className="flex items-center gap-2">
          <img src="/coin.png" alt="currency" />
          <p className="font-bold text-[27px] text-customGold">2030</p>
        </div>
      </section>
    </div>
  );
};

export default TopLayer;
