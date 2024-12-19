//App
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//Icon(s)
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from "axios";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]); // State to hold leaderboard data
  const [loading, setLoading] = useState(true); // Loading state

  const apiBaseUrl = "https://vivablockchainconsulting.xyz";

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/leaderboard`);
        setLeaderboard(response.data); // Store the leaderboard data in the state
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (leaderboard.length === 0)
    return <div>No leaderboard data available.</div>;
  
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
        {/* <div>
          <p>{user.username || "Unknown User"}</p>
          <p className="text-[11px]">
            Total game score: {user.tokenCount || 0}
          </p>
        </div>
        <div>
          <p>Rank: {user.rank || "N/A"}</p>
        </div> */}
      </section>
      {leaderboard.map((user, index) => (
        <section
          key={user.id}
          className="w-[371px] h-[75px] border bg-[#F1F1F1] px-[10px] rounded-[15px] center justify-between mt-4"
        >
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
            <p>Rank: {index + 1}</p> {/* Display rank based on the index */}
          </div>
        </section>
      ))}
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
