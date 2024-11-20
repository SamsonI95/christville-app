import React from "react";

// Component(s)
import BottomNav from "../../Components/BottomNav";
import { Outlet } from "react-router-dom";

const AppPage = () => {
  return (
    <>
      <div className="app-container">
        <section >
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
