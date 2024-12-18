import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//Icon(s)
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from "axios";

const LeaderBoard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyScore, setWeeklyScore] = useState(null);
  const [monthlyScore, setMonthlyScore] = useState(null);

  const apiBaseUrl = "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user`);
        const fetchedUser = response.data;

        // Set the fetched user data
        setUser(fetchedUser);

        // Fetch weekly and monthly scores using the Telegram ID
        const [weeklyResponse, monthlyResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}/leaderboard/weekly`, {
            params: { telegram_id: fetchedUser.telegramId },
          }),
          axios.get(`${apiBaseUrl}/leaderboard/monthly`, {
            params: { telegram_id: fetchedUser.telegramId },
          }),
        ]);

        setWeeklyScore(weeklyResponse.data.score || null);
        setMonthlyScore(monthlyResponse.data.score || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available.</div>;

  return (
    <div className="mt-7 flex flex-col items-center h-[50vh] font-Poppins px-[28px]">
      <h3>Leader board</h3>
      <section className="center justify-between w-full">
        <div className="space-x-4">
          <NavLink>Weekly</NavLink>
          <NavLink>Monthly</NavLink>
        </div>
        <div>
          <IoMdInformationCircleOutline />
        </div>
      </section>
      <section className="w-[371px] h-[75px] border bg-[#F1F1F1] px-[10px] rounded-[15px] center justify-between mt-4">
        <div>
          <div className="border border-black bg-black w-8 h-8 rounded-full"></div>
          {/* <img src="" alt="" /> */}
        </div>
        <div>
          <p>{user.username || "Unknown User"}</p>
          <p className="text-[11px]">
            Total game score: {user.tokenCount || 0}
          </p>
        </div>
        <div>
          <p>Rank: {user.rank || "N/A"}</p>
        </div>
      </section>
    </div>
  );
};

export default LeaderBoard;
