import React from "react";
import TopLayer from "../../Components/TopLayer";

const HomePage = () => {
  return (
    <div className="flex flex-col h-[50vh] font-Poppins px-[28px]">
      <TopLayer />
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-2xl">Tap to read</h3>
        <img src="/Bible2.png" alt="Bible" />
      </section>
    </div>
  );
};

export default HomePage;
