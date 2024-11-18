import React from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();

  // Determine the active page based on the current path
  const getActiveIndex = () => {
    switch (location.pathname) {
      case "/page-2":
        return 1;
      case "/page-3":
        return 2;
      case "/page-4":
        return 3;
      default:
        return 0;
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="flex justify-center space-x-4 mt-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className={`h-2 w-[99px] rounded-[25px] ${
            index <= activeIndex ? "bg-customGold" : "bg-[#242424]"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
