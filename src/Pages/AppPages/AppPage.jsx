import React from "react";

// Component(s)
import TopLayer from "../../Components/TopLayer";
import BottomNav from "../../Components/BottomNav";
import { Outlet } from "react-router-dom";

const AppPage = () => {
  return (
    <>
      <div className="app-container">
        <section className="px-[28px]">
          <TopLayer />
        </section>
        <section className="translate-y-[-2.5rem]">
          <Outlet />
        </section>
        <section className="w-full border border-t-[#A0A0A0]">
          <BottomNav />
        </section>
      </div>
    </>
  );
};

export default AppPage;
