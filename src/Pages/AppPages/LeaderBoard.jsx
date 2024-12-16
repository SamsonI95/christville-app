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

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          (`${apiBaseUrl}/user`), // Replace with your backend URL
          { params: { telegram_id: "sample_telegram_id" } } // Replace with actual Telegram ID
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Fetch weekly and monthly scores from the backend
        const weeklyResponse = await axios.get(
          ("http://localhost:8080/api/ leaderboard/weekly"),
          { params: { telegram_id: "sample_telegram_id" } } // Replace with actual Telegram ID
        );
        const monthlyResponse = await axios.get(
          "http://localhost:8080/api/leaderboard/monthly",
          { params: { telegram_id: "sample_telegram_id" } }
        );

        setWeeklyScore(weeklyResponse.data.score || null);
        setMonthlyScore(monthlyResponse.data.score || null);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
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
