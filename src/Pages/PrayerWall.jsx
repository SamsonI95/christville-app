import React from "react";
import { useNavigate } from "react-router-dom";

//Component(s)
import ProgressBar from "../Components/ProgressBar";

const PrayerWall = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/page-1");
  };
  return (
    <>
      <ProgressBar />

      <div className="center-col pt-[101px] px-[26px]">
        <div className="">
          <img
            className="w-[342px] h-[313px]"
            src="/PrayerHands.png"
            alt="praying"
          />
          <p className="font-Inria font-bold text-[36px] text-customGold text-center py-8">
            Prayer wall
          </p>
        </div>
        <p className="font-Poppins text-[18px] text-center">
          Whether you’re seeking daily inspiration, deeper understanding, or a
          community of believers, Faith is your companion on the path to
          spiritual growth.
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

export default PrayerWall;
