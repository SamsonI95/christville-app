import React, { useRef, useState } from "react";
import { ThunderboltIcon } from "../../Icons/Icons";
import { FaChevronRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="absolute bottom-0 bg-[#F1F1F1] w-full h-[20rem] max-w-md rounded-t-[100px] shadow-lg p-5 space-y-3"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-[5rem] text-gray-600 text-xl font-bold"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleCheckTask = () => {
    if (selectedTask && !completedTasks.includes(selectedTask.id)) {
      setCompletedTasks((prev) => [...prev, selectedTask.id]);
    }
    closeModal();
  };

  return (
    <div className="center-col font-Poppins pt-[50px]">
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
      <section className="mt-5 w-full">
        <p className="text-[#000000] opacity-50">Daily Tasks</p>
        {TaskPageContent.map((item, index) => (
          <Link to={item.path}>
            <div
              key={index}
              onClick={() => handleTaskClick(item)}
              className="flex items-center justify-between mt-4 border bg-[#F1F1F1] opacity-100  h-[80px] px-3 rounded-[16px]"
            >
              <img src={item.icon} alt="image" />
              <div className="text-[13px] w-[214px] space-y-2">
                <p>{item.taskText}</p>
                <section className="flex items-center gap-1">
                  <img src="/BOSS COIN ICON 2 (DARK).png" alt="coin" />
                  <p>{item.coinText}</p>
                </section>
              </div>
              {completedTasks.includes(item.id) ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaChevronRight />
              )}
            </div>
          </Link>
        ))}
      </section>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2 className="pt-5 text-center text-xl font-bold">
          {selectedTask?.taskText}
        </h2>
        <p className="center justify-center py-3 mt-3 text-customGold">
          <img src="/coin.png" alt="coin" /> Earn {selectedTask?.coinText} Boss
          coins
        </p>
        <div className="space-y-7">
          <Link
            to={selectedTask?.path}
            className="mt-5 block text-center bg-customGold text-white px-4 py-2 rounded-[16px]"
            onClick={closeModal}
          >
            Join
          </Link>
          <button
            onClick={handleCheckTask}
            className="mt-4 block text-center bg-transparent px-4 border border-[#000000] py-2 rounded-[16px] w-[350px]"
          >
            Check
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskPage;
