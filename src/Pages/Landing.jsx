import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/ThemeContect";

//icon(s)
import { FaCircleChevronRight } from "react-icons/fa6";

//image(s)
import Bible from "../../public/Bible.png";
import Jesus from "../../public/Jesus.svg";

//Component(s)
import LoadingScreen from "../Components/LoadingScreen";
import { useUserContext } from "../Usercontext";

const Landing = () => {
  const { user, fetchUserById } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  // TESTING PURPOSES

  useEffect(() => {
    // Update the loading text with a dot sequence
    const dotsInterval = setInterval(() => {
      setLoadingText((prev) => {
        const dots = prev.split(".").length - 1;
        return dots < 3 ? `${prev}.` : "Loading";
      });
    }, 500); // Adjust interval for dot update speed

    // Simulate a loading period
    const loadingTimer = setTimeout(() => {
      clearInterval(dotsInterval);
      setIsLoading(false);
    }, 3000); // Adjust total loading time

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(dotsInterval);
    };
  }, []);

  const handleClick = async () => {
    if (!user || !user.id) {
      console.error("User ID is not available in the context.");
      return;
    }

    const userId = user.id;
    console.log("User ID fetched from context:", userId);

    try {
      const fetchedUser = await fetchUserById(userId); // Fetch user details
      if (fetchedUser) {
        console.log("User exists:", fetchedUser);
        navigate("/app/page-1"); // Redirect if user exists
      } else {
        console.log("User not found, navigating to page-2");
        navigate("/page-2"); // Continue to the next page if no user is found
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // Optionally show an error message
    }
  };
  if (isLoading) {
    // Show the loading screen
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingScreen image="./Bible.png" altText="Loading..." />
        <p className="relative top-[10rem] text-customGold z-10 mt-4 text-lg font-bold">
          {loadingText}
        </p>
      </div>
    );
  }
  return (
    <div className="pt-[81px] px-[26px]">
      <div className="flex flex-col items-center">
        <img src="./Jesus.svg" alt="jesus-icon" loading="lazy" />
        <p className="font-Inria font-bold text-[36px] text-customGold text-center py-8">
          Christville
        </p>
      </div>
      <p className="font-Poppins text-[18px] text-center">
        Welcome to Faith, the ultimate Bible token designed to enrich your
        spiritual journey
      </p>
      <div className="flex flex-col items-center justify-center">
        <button
          className="text-[55px] py-[50px] text-customGold"
          onClick={handleClick}
        >
          <FaCircleChevronRight />
        </button>
      </div>
      {/* <button className="text-[55px] py-[50px] relative left-[40%]">
        <FaCircleChevronRight className="text-customGold" />
      </button> */}
      <div className="pt-[0px] flex flex-col items-center justify-center">
        <p className="font-Poppins pb-[17px]">Follow us on social media</p>
        <section className="flex gap-5">
          <Link to="#">
            <img src="/instagram.png" alt="instagram" />
          </Link>
          <Link to="#">
            <img src="/youtube.png" alt="youtube" />
          </Link>
          <Link to="#">
            <img src="/twitter.png" alt="x" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Landing;
