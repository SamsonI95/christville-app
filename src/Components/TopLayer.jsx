import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext, useUserContext } from "../Usercontext";

//Icon(s)
import { ThunderboltIcon } from "../Icons/Icons";

const TopLayer = ({ userId }) => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isFaithPage = location.pathname.startsWith("/app/page-2");
  // const { daysSinceJoin } = useUserContext();
  const [tokenCount, setTokenCount] = useState(0);
  const [successiveLoginDays, setSuccessiveLoginDays] = useState(0);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://your-backend-url.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setProfilePic(userData.photo_url); // Assuming your backend includes `photo_url`
        setTokenCount(userData.token_count || 0);
        setSuccessiveLoginDays(userData.successive_login_days || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-between pt-[50px] gap-4">
      <section className="flex items-center justify-between w-full">
        <section>Today</section>
        <section className="flex items-center gap-2">
          {/* counter showing number of days a user logs in */}
          <div className="flex">
            <ThunderboltIcon />
            <p>{successiveLoginDays}</p>
          </div>
          {/* replace div below with user image */}
          {user ? (
            <img
              src={user.photo_url || "/default-avatar.png"}
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-black"
            />
          ) : (
            <div className="border border-black bg-black w-8 h-8 rounded-full"></div>
          )}
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
        {/* coin value which is gotten from how long the user has been on telegram */}
        <div className="flex items-center gap-2">
          <img src="/coin.png" alt="currency" />
          <p className="font-bold text-[27px] text-customGold">{tokenCount}</p>
          {/* replace with token generated */}
        </div>
      </section>
    </div>
  );
};

export default TopLayer;
