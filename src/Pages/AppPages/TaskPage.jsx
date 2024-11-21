import React from "react";
import { ThunderboltIcon } from "../../Icons/Icons";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TaskPageContent = [
  {
    path: "#",
    icon: "/TELEGRAM 3D ICON.png",
    taskText: "Join Our telegram channel",
    coinText: "50",
  },
  {
    path: "#",
    icon: "/twitter X 3D ICON.png",
    taskText: "Follow Christville’s on X (Twitter)",
    coinText: "50",
  },
  {
    path: "#",
    icon: "/LINKEDIN ICON.png",
    taskText: "Follow Christville’s LinkedIn page",
    coinText: "50",
  },
  {
    path: "#",
    icon: "/INSTAGRAM ICON.png",
    taskText: "Follow Christville’s IG page",
    coinText: "50",
  },
];

const TaskPage = () => {
  return (
    <div className="center-col font-Poppins px-[28px] pt-[50px]">
      <section className="flex items-center justify-between w-full">
        <section className="text-[22px] font-medium">Today</section>
        <section className="flex items-center gap-2">
          <div className="flex">
            <ThunderboltIcon />
            <p>1</p>
          </div>
          <div className="border border-black bg-black w-5 h-5 rounded-full"></div>
        </section>
      </section>
      <section className="mt-[43px]">
        <h3 className="font-medium">
          Complete tasks, collect rewards, and conquer the tasks
        </h3>
      </section>
      <section className="mt-5">
        <p className="text-[#000000] opacity-50">Daily Tasks</p>
        {TaskPageContent.map((item, index) => (
          <Link to={item.path}>
            <div
              key={index}
              className="flex items-center justify-between mt-4 border bg-[#F1F1F1] opacity-100 w-[350px] h-[80px] px-3 rounded-[16px]"
            >
              <img src={item.icon} alt="image" />
              <div className="text-[13px] w-[214px] space-y-2">
                <p>{item.taskText}</p>
                <section className="flex items-center gap-1">
                  <img src="/BOSS COIN ICON 2 (DARK).png" alt="coin" />
                  <p>{item.coinText}</p>
                </section>
              </div>
              <FaChevronRight />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default TaskPage;
