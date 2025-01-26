import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "../Components/ThemeContect";
import axios from "axios";
import { UserContext } from "../Usercontext";
import { useNavigate } from "react-router-dom";

// Component(s)
import ProgressBar from "../Components/ProgressBar";

// Function to calculate coin allocation based on account age
const allocateCoins = (accountAgeYears) => {
  if (accountAgeYears < 1) {
    return 100; // 0-1 years
  } else if (accountAgeYears < 2) {
    return 200; // 1-2 years
  } else if (accountAgeYears < 3) {
    return 300; // 2-3 years
  } else {
    return 500; // 3+ years
  }
};

const TelegramUserAuth = () => {
  const { user, setUser, daysSinceJoin, setDaysSinceJoin } =
    useContext(UserContext); // State to store Telegram user info
  const [coins, setCoins] = useState(0);
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Telegram user info from Web Apps API
    const telegram = window.Telegram.WebApp;
    const telegramUser = telegram.initDataUnsafe?.user;

    if (telegramUser) {
      setUser(telegramUser);

      // Calculate "days since join" using account creation timestamp from user.id
      const userId = telegramUser.id;

      // Extract the timestamp from the user ID (lower 32 bits)
      const accountCreationTimestamp = userId & 0xffffffff;
      const accountCreationDate = new Date(accountCreationTimestamp * 1000); // Convert to milliseconds

      // Calculate account age in seconds and then convert to years
      const accountAgeInSeconds = (new Date() - accountCreationDate) / 1000;
      const accountAgeInYears = accountAgeInSeconds / (60 * 60 * 24 * 365);

      // Set the days since join (approximation)
      const daysSinceJoin = Math.ceil(accountAgeInYears * 365); // Convert years to days
      setDaysSinceJoin(daysSinceJoin); // Convert years to days

      // Allocate coins based on the account age
      const allocatedCoins = allocateCoins(accountAgeInYears);
      setCoins(allocatedCoins);

      console.log("Payload sent to backend:", {
        telegramId: String(telegramUser.id),
        username: telegramUser.username || telegramUser.first_name,
        coins: allocatedCoins,
      });

      // Send user info to the backend
      const apiBaseUrl = "https://vivablockchainconsulting.xyz";
      axios
        .post(`${apiBaseUrl}/user`, {
          telegramId: String(telegramUser.id),
          username: telegramUser.username || telegramUser.first_name,
          coins: allocatedCoins,
        })

        .then((response) => {
          console.log("User data sent to the backend:", response.data);
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Axios error:", error.response?.data || error.message);
        });
    } else {
      console.error("Telegram user info is not available.");
    }
  }, [setUser, setDaysSinceJoin]);

  const handleClick = () => {
    navigate("/page-3");
  };

  return (
    <div className="font-Poppins center-col px-[28px]">
      <ProgressBar />
      {user ? (
        <div className="mt-5 text-center space-y-[8rem]">
          <h3 className="text-[24px] font-semibold">
            @{user.username || user.first_name}, <br />
            you are a Legend!
          </h3>
          <p>You've joined Faith near</p>
          <span className="pt-[73px] pb-[34px] text-[96px] text-customGold font-semibold">
            {daysSinceJoin || "N/A"}
          </span>
          <p className="font-semibold">days ago</p>
          <h4 className="mt-[8rem]">Your account number is #{user.id}</h4>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <button
        className="mt-[5rem] text-[20px] bg-customGold text-white w-[343px] h-[44px] rounded-[12px]"
        onClick={handleClick}
      >
        Next
      </button>
    </div>
  );
};

export default TelegramUserAuth;

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../Components/ThemeContect";
// import axios from "axios";
// import { UserContext } from "../Usercontext"; // Import the UserContext

// // Component(s)
// import ProgressBar from "../Components/ProgressBar";

// const TelegramUserAuth = () => {
//   const [user, setUser] = useState(null); // Local state to store Telegram user info
//   const [daysSinceJoin, setDaysSinceJoin] = useState(null); // State for days since account creation
//   const navigate = useNavigate();
//   const { isDarkMode } = useTheme();
//   const { setUser: setGlobalUser } = useContext(UserContext); // Renamed to avoid conflict
//   const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

//   useEffect(() => {
//     // Simulating a dummy Telegram user for testing purposes
//     const dummyTelegramUser = {
//       id: 1234567890, // Unique user ID
//       username: "test_user", // Username of the user
//       first_name: "Test", // First name of the user
//       last_name: "User", // Last name of the user
//       language_code: "en", // Language code
//       photo_url: "https://via.placeholder.com/150", // Placeholder for profile picture URL
//       is_bot: false, // Whether the user is a bot
//     };

//     // Set the dummy user into the context (simulating a Telegram user login)
//     setGlobalUser(dummyTelegramUser);

//     // Set the local state to the dummy user
//     setUser(dummyTelegramUser);

//     // Calculate "days since join" (mocked for example purposes)
//     const accountCreationDate = new Date(); // Replace with actual user `createdAt` if available
//     setDaysSinceJoin(
//       Math.ceil((new Date() - accountCreationDate) / (1000 * 60 * 60 * 24))
//     );

//     // Optionally, you can send the dummy data to the backend (if required)
//     const apiBaseUrl = "https://vivablockchainconsulting.xyz";
//     axios
//       .post(`${apiBaseUrl}/user`, {
//         telegramId: String(dummyTelegramUser.id),
//         username: dummyTelegramUser.username || dummyTelegramUser.first_name,
//       })
//       .then((response) => {
//         console.log("Dummy user data sent to the backend:", response.data);
//       })
//       .catch((error) => {
//         console.error("Axios error:", error.response?.data || error.message);
//       });
//   }, [setGlobalUser]);

//   const handleClick = () => {
//     navigate("/page-3");
//   };

//   return (
//     <div className="font-Poppins center-col px-[28px]">
//       <ProgressBar />
//       {user ? (
//         <div className="mt-5 text-center space-y-[8rem]">
//           <h3 className="text-[24px] font-semibold">
//             @{user.username || user.first_name}, <br />
//             you are a Legend!
//           </h3>
//           <p>You've joined Faith near</p>
//           <span className="pt-[73px] pb-[34px] text-[96px] text-customGold font-semibold">
//             {daysSinceJoin || "N/A"}
//           </span>
//           <p className="font-semibold">days ago</p>
//           <h4 className="mt-[8rem]">Your account number is #{user.id}</h4>
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//       <button
//         className="mt-[5rem] text-[20px] bg-customGold text-white w-[343px] h-[44px] rounded-[12px]"
//         onClick={handleClick}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default TelegramUserAuth;
