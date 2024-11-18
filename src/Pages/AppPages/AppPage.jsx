import React from "react";

// Component(s)
import TopLayer from "../../Components/TopLayer";
import BottomNav from "../../Components/BottomNav";
import { Outlet } from "react-router-dom";

const AppPage = () => {
  return (
    <>
      <div className="relative h-screen w-full">
        <section className="px-[28px]">
          <TopLayer />
        </section>
        <Outlet />
        <section className="absolute bottom-0 w-full border border-t-[#A0A0A0]">
          <BottomNav />
        </section>
      </div>
    </>
  );
};

export default AppPage;
