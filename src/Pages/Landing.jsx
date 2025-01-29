import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const { user, fetchUserById } = useUserContext();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initializeUser = async () => {
      const userIdFromUrl = searchParams.get("userId");

      console.log("URL Params:", userIdFromUrl);
      console.log("Current User State:", user);
      if (userIdFromUrl) {
        console.log("Found userId in URL:", userIdFromUrl);
        await fetchUserById(userIdFromUrl);
      } else {
        console.log("No userId found in URL parameters");
        setIsLoading(false); // If no userId, stop loading immediately
      }
    };

    initializeUser();
  }, [fetchUserById, searchParams]);

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

  const handleClick = () => {
    if (user) {
      navigate("/app/page-1");
    } else {
      navigate("/page-2");
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
