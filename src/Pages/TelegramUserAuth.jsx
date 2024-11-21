import React from "react";
import { useNavigate } from "react-router-dom";

//Component(s)
import ProgressBar from "../Components/ProgressBar";

const TelegramUserAuth = () => {
const navigate = useNavigate();

const handleClick = () => {
    navigate("/page-3");
}
  return (
    <div className="center-col px-[28px]">
        <ProgressBar />
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
