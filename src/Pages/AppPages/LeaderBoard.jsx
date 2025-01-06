//App
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Usercontext";

//Icon(s)
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from "axios";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]); // State to hold leaderboard data
  const { user } = useContext(UserContext); // Access global user state
  const [userRank, setUserRank] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [error, setError] = useState(null);

  const apiBaseUrl = "https://vivablockchainconsulting.xyz";

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/leaderboard`);
        console.log("Leaderboard Data:", response.data);
        const leaderboardData = response.data.leaderboard || [];
        setLeaderboard(leaderboardData); // Store the leaderboard data in the state
        setTotalPlayers(response.data.pagination.totalItems || 0);

        if (user) {
          const userDetails = leaderboardData.find(
            (player) => player.telegramId === String(user.id)
          );
          setUserRank(userDetails?.rank || "N/A");
          setUserScore(userDetails?.tokenCount || 0);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to fetch leaderboard data.");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    console.log("User from context:", user);
    fetchLeaderboard();
  }, [user]);

  // Display loading state or error message if applicable
  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(leaderboard) || leaderboard.length === 0)
    return <div>No leaderboard data available.</div>;

  return (
    <div className="mt-7 flex flex-col items-center h-[50vh] font-Poppins">
      <h3 className="mb-6">Leader board</h3>
      <section className="center justify-between w-full">
        <div className="space-x-4">
          <NavLink
            className={({ isActive }) =>
              `faith-page-link ${isActive ? "active" : ""}`
            }
          >
            Weekly
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `faith-page-link ${isActive ? "active" : ""}`
            }
          >
            Monthly
          </NavLink>
        </div>
        <div>
          <IoMdInformationCircleOutline className="text-customGold text-2xl" />
        </div>
      </section>
      <section>
        {user && (
          <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg w-full">
            <img
              src={user.photo_url || "/default-avatar.png"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">
                {user.username || "Unknown"}
              </h4>
              <p className="text-sm text-gray-600">Rank: #{userRank}</p>
              <p className="text-sm text-gray-600">Score: {userScore}</p>
            </div>
          </div>
        )}
      </section>
      <section className="mt-[18px] mr-auto flex items-center space-x-4">
        <p>{totalPlayers} Players</p>
        <hr className="w-[17rem] border-[#2A2A2A]" />
      </section>
      <section className="w-full mt-6">
        <table className="w-full border-none">
          <thead>
            <tr>
              <th className="px-4 py-4 border-b">#</th>
              <th className="px-4 py-4 border-b text-left">Players</th>
              <th className="px-4 py-4 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={player.id} className="text-center text-customGray">
                <td className="px-4 py-4 border-b">{index + 1}</td>{" "}
                {/* Player Number */}
                <td className="px-4 py-4 border-b text-left">
                  @{player.username || "Unknown"}
                </td>{" "}
                {/* Player Username */}
                <td className="px-4 py-4 border-b">
                  {player.tokenCount || 0}
                </td>{" "}
                {/* Player Score */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LeaderBoard;

// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// //Icon(s)
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import axios from "axios";

// const LeaderBoard = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [weeklyScore, setWeeklyScore] = useState(null);
//   const [monthlyScore, setMonthlyScore] = useState(null);

//   const apiBaseUrl = "https://vivablockchainconsulting.xyz";

//   // Extract the `id` parameter from the URL
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const userId = searchParams.get("id");

//   useEffect(() => {
//     if (!userId) {
//       console.error("User ID is missing in the URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${apiBaseUrl}/leaderboard`);
//         const fetchedUser = response.data;

//         // Set the fetched user data
//         setUser(fetchedUser);

//         // Fetch weekly and monthly scores using the user ID
//         // const [weeklyResponse, monthlyResponse] = await Promise.all([
//         //   axios.get(`${apiBaseUrl}/leaderboard`, {
//         //     params: { user_id: fetchedUser.id }, // Using dynamic ID
//         //   }),
//         //   axios.get(`${apiBaseUrl}/leaderboard`, {
//         //     params: { user_id: fetchedUser.id },
//         //   }),
//         // ]);

//         // setWeeklyScore(weeklyResponse.data.score || null);
//         // setMonthlyScore(monthlyResponse.data.score || null);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   if (loading) return <div>Loading...</div>;
//   if (!user) return <div>No user data available.</div>;

//   return (
//     <div className="mt-7 flex flex-col items-center h-[50vh] font-Poppins px-[28px]">
//       <h3>Leader board</h3>
//       <section className="center justify-between w-full">
//         <div className="space-x-4">
//           <NavLink>Weekly</NavLink>
//           <NavLink>Monthly</NavLink>
//         </div>
//         <div>
//           <IoMdInformationCircleOutline />
//         </div>
//       </section>
//       <section className="w-[371px] h-[75px] border bg-[#F1F1F1] px-[10px] rounded-[15px] center justify-between mt-4">
//         <div>
//           <div className="border border-black bg-black w-8 h-8 rounded-full"></div>
//           {/* <img src="" alt="" /> */}
//         </div>
//         <div>
//           <p>{user.username || "Unknown User"}</p>
//           <p className="text-[11px]">
//             Total game score: {user.tokenCount || 0}
//           </p>
//         </div>
//         <div>
//           <p>Rank: {user.rank || "N/A"}</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LeaderBoard;
