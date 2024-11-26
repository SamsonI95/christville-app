import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component(s)
import ProgressBar from "../Components/ProgressBar";

const TelegramUserAuth = () => {
  const [user, setUser] = useState(true); // State to store Telegram user info
  const [daysSinceJoin, setDaysSinceJoin] = useState(null); // State for days since account creation
  const navigate = useNavigate();

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
        <div className="space-y-10">
          <h3 className="text-[24px] text-justify">@{user.username || user.first_name}, you are a Legend!</h3>
          <p>You've joined Faith near</p>
          <span>{daysSinceJoin || "N/A"}</span>
          <p>days ago</p>
          <h4>Your account number is {user.id}</h4>
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
