import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/ThemeContect";
import axios from "axios";

// Component(s)
import ProgressBar from "../Components/ProgressBar";

const TelegramUserAuth = () => {
  const [user, setUser] = useState(null); // State to store Telegram user info
  const [daysSinceJoin, setDaysSinceJoin] = useState(null); // State for days since account creation
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    // Fetch Telegram user info from Web Apps API
    const telegram = window.Telegram.WebApp;
    const telegramUser = telegram.initDataUnsafe?.user;

    if (telegramUser) {
      setUser(telegramUser);

      // Calculate "days since join" (mocked for example purposes)
      const accountCreationDate = new Date(); // Replace with actual user `createdAt` if available
      setDaysSinceJoin(
        Math.ceil((new Date() - accountCreationDate) / (1000 * 60 * 60 * 24))
      );

      // Send user info to the backend
      const apiBaseUrl = process.env.BASE_URL;
      axios
        .post(`${apiBaseUrl}/user`, {
          telegramId: telegramUser.id,
          username: telegramUser.username || telegramUser.first_name,
        })
        .then((response) => {
          console.log("User data sent to the backend:", response.data);
        })
        .catch((error) => {
          console.error("Error sending user data to the backend:", error);
        });
    } else {
      console.error("Telegram user info is not available.");
    }
  }, []);

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
    // <div className="conter-col font-Poppins px-[28px]">
    //   <ProgressBar />
    //   <div className="mt-5 text-center">
    //     <h3 className="text-[24px]">
    //       @it's Jeffery, <br/>you are a Legend!
    //     </h3>
    //     <p className="pt-6">You've joined Faith near</p>
    //     <span className="pt-[73px] pb-[34px] text-[96px] text-customGold font-semibold">2030</span>
    //     <p className="font-semibold">days ago</p>
    //     <h4 className="mt-[8rem]">Your account number is #1010234764</h4>
    //   </div>
    //   <button
    //     className="mt-[5rem] text-[20px] bg-customGold text-white w-[343px] h-[44px] rounded-[12px]"
    //     onClick={handleClick}
    //   >
    //     Next
    //   </button>
    // </div>
  );
};

export default TelegramUserAuth;
