import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/ThemeContect";

//Component(s)
import ProgressBar from "../Components/ProgressBar";

const DailyVerse = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  const handleClick = () => {
    navigate("/page-4");
  };
  return (
    <>
      <ProgressBar />
      <div
        className="center-col pt-[101px] px-[28px]"
        
      >
        <div className="">
          <img
            className="w-[342px] h-[313px]"
            src="/Bible.png"
            alt="bible-icon"
          />
          <p className="font-Inria font-bold text-[36px] text-customGold text-center py-8">
            Daily Verse
          </p>
        </div>
        <p className="font-Poppins text-[18px] text-center">
          Dive into daily verses, interactive reflections, and personalized
          prayer prompts, all designed to nurture your faith.
        </p>
        <button
          className="mt-[67px] text-[20px] bg-customGold text-white w-[343px] h-[44px] rounded-[12px]"
          onClick={handleClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default DailyVerse;
