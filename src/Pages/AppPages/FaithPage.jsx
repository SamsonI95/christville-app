import React from "react";
import TopLayer from "../../Components/TopLayer";
import { Outlet } from "react-router-dom";

const FaithPage = () => {
  return (
    <div className="flex flex-col h-[50vh] font-Poppins px-[28px]">
      <TopLayer />
      <Outlet />
    </div>
  );
};

export default FaithPage;
