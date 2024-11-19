import React from "react";

//Icon(s)
import { ThunderboltIcon } from "../Icons/Icons";

const TopLayer = () => {
  return (
    <div className="flex flex-col items-center justify-between pt-[10px] gap-4">
      <section className="flex items-center justify-between w-full">
        <section>Today</section>
        <section className="flex items-center gap-2">
          <div className="flex">
            <ThunderboltIcon />
            <p>1</p>
          </div>
          <div className="border border-black bg-black w-5 h-5 rounded-full"></div>
        </section>
      </section>
      <section className="flex items-center justify-between w-full">
        <h3>Daily verse</h3>
        <div className="flex items-center gap-2">
          <img src="/coin.png" alt="currency" />
          <p className="font-bold text-[27px] text-customGold">2030</p>
        </div>
      </section>
    </div>
  );
};

export default TopLayer;
