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
  // const [tokenCount, setTokenCount] = useState(0);
  const [dailyBonusValue, setDailyBonusValue] = useState(null);
  const [successiveLoginDays, setSuccessiveLoginDays] = useState(0);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      if (!user || !user.id) {
        console.error("User not available in context.");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        // setProfilePic(userData.photo_url); // Assuming your backend includes `photo_url`
        setSuccessiveLoginDays(userData.successive_login_days || 0);
        setDailyBonusValue(userData.user.tokenCount || 0);
        console.log("Bonus Value:", userData.user.tokenCount )
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

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
          <p className="font-bold text-[27px] text-customGold">
            {dailyBonusValue !== null ? dailyBonusValue : "--"}
          </p>
          {/* replace with token generated */}
        </div>
      </section>
    </div>
  );
};

export default TopLayer;
