import React from "react";

const HomePage = () => {
  return (
    <div className="font-Poppins  px-[28px]">
      <section className="flex items-center justify-between pt-[30px]">
        <h3>Daily verse</h3>
        <div className="flex items-center gap-2">
          <img src="/coin.png" alt="currency" />
          <p className="font-bold text-[27px] text-customGold">2030</p>
        </div>
      </section>
      <section className="flex flex-col items-center pt-[100px]">
        <h3 className="text-2xl">Tap to read</h3>
        <img src="/Bible2.png" alt="Bible" />
      </section>
    </div>
  );
};

export default HomePage;
