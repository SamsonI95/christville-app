import React from "react";

//Icon(s)
import { ThunderboltIcon } from "../Icons/Icons";

const TopLayer = () => {
  return (
    <div className="pt-[71px] flex items-center justify-between">
      <section>Today</section>
      <section className="flex items-center gap-2">
        <div className="flex">
          <ThunderboltIcon />
          <p>1</p>
        </div>
        <div className="border border-black bg-black w-5 h-5 rounded-full"></div>
      </section>
    </div>
  );
};

export default TopLayer;
