import React, { useRef, useState } from "react";
import { useTheme } from "../../Components/ThemeContect";
import { ThunderboltIcon } from "../../Icons/Icons";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Usercontext";
import axios from "axios";

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
        // ref={modalRef}
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
    id: 1,
    path: "https://t.me/christvilleminiapp",
    icon: "/TELEGRAM 3D ICON.png",
    taskText: "Join Our telegram channel",
    coinText: "150",
    apiPath: "task/tg",
  },
  {
    id: 2,
    path: "https://x.com/christville_app",
    icon: "/twitter X 3D ICON.png",
    taskText: "Follow Christville’s on X (Twitter)",
    coinText: "150",
    apiPath: "task/twitter",
  },
  {
    id: 3,
    path: "#",
    icon: "/LINKEDIN ICON.png",
    taskText: "Follow Christville’s LinkedIn page",
    coinText: "50",
  },
  {
    id: 4,
    path: "#",
    icon: "/INSTAGRAM ICON.png",
    taskText: "Follow Christville’s IG page",
    coinText: "50",
  },
];

const TaskPage = () => {
  const { user } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  // const handleJoinTask = async () => {
  //   if (!user || !user.id) {
  //     console.error(
  //       "User ID is not available in the context for claiming the bonus."
  //     );
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${apiBaseUrl}/${selectedTask.apiPath}/${user.id}`
  //     );
  //     console.log(response.data); // Handle response from API

  //     // On success, mark task as completed and show confirmation
  //     setCompletedTasks((prev) => [...prev, selectedTask.id]);

  //     // Optionally redirect user to the task's page (e.g., Telegram)
  //     window.open(selectedTask.path, "_blank");
  //     setModalOpen(false); // Close the modal after task is claimed
  //   } catch (error) {
  //     console.error("Error claiming task:", error);
  //     alert("Failed to claim task. Please try again.");
  //   }
  // };

  const handleJoinTask = async () => {
    if (!user || !user.id) {
      console.error(
        "User ID is not available in the context for claiming the bonus."
      );
      return;
    }

    try {
      // Mark the task as 'in progress'
      setSelectedTask((prevTask) => ({ ...prevTask, status: "in-progress" }));

      // Open the task URL
      window.open(selectedTask.path, "_blank");

      // After user completes the task externally, call the API to verify the task completion
      await verifyTaskCompletion(selectedTask);
    } catch (error) {
      console.error("Error claiming task:", error);
      alert("Failed to claim task. Please try again.");
    }
  };

  const verifyTaskCompletion = async (task) => {
    if (!user || !user.id) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.get(
        `${apiBaseUrl}/${task.apiPath}/verify/${user.id}`
      );

      if (response.data.completed) {
        // If the task is completed, reward the user
        setCompletedTasks((prev) => [...prev, task.id]);
        alert(`Task Completed! You've earned ${task.coinText} tokens.`);
      } else {
        alert("Task not completed yet. Please complete the task externally.");
      }
    } catch (error) {
      console.error("Error verifying task completion:", error);
      alert("Failed to verify task completion. Please try again.");
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
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
        ))}
      </section>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2 className="pt-5 text-center text-xl font-bold">
          {selectedTask?.taskText}
        </h2>
        <p className="center justify-center py-3 mt-3 text-customGold">
          <img src="/coin.png" alt="coin" className="mr-3" /> Earn{" "}
          {selectedTask?.coinText} Boss coins
        </p>
        <div className="space-y-7">
          <Link
            onClick={handleJoinTask}
            // to={selectedTask?.path}
            className="mt-5 block text-center bg-customGold text-white px-4 py-2 rounded-[16px]"
          >
            Join
          </Link>
          <button
            onClick={closeModal}
            className="mt-4 block text-center bg-transparent px-4 border border-[#000000] py-2 rounded-[16px] w-full"
          >
            Check
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskPage;
