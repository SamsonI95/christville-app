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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const { user } = useUserContext(); // Access user context
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (!userId) {
  //       console.error("No userId found in context.");
  //       setIsCheckingUser(false);
  //       return;
  //     }

  //     console.log("Fetched userId from context:", userId);

  //     try {
  //       await fetchUserById(userId); // Fetch user by the userId

  //       setIsCheckingUser(false);
  //     } catch (error) {
  //       console.error("Error checking user:", error);
  //       setIsCheckingUser(false);
  //     }
  //   };

  //   checkUser();
  // }, [userId, fetchUserById]);

  useEffect(() => {
    if (user) {
      // Only fetch data if user is available
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}/user/${user.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          setIsLoading(false);
          // Process data here
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        }
      };
  
      fetchUserData();
    }
  }, [user]);// Only run this effect when 'user' context is available

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
    console.log("Navigating, user:", user);
    if (user) {
      navigate("/app/page-1"); // If user exists, go to Page 1
    } else {
      navigate("/page-2"); // If user does not exist, go to Page 2
    }
  };

  // const handleClick = async () => {
  //   try {
  //     // Extract userId from the query parameters
  //     const userId = new URLSearchParams(window.location.search).get("userId");

  //     if (!userId) {
  //       console.error("No userId found in query parameters.");
  //       navigate("/page-2"); // Navigate to the fallback page if no userId is provided
  //       return;
  //     }

  //     // Fetch the user from the context function
  //     await fetchUserById(userId);

  //     // Navigate based on whether the user exists
  //     if (user) {
  //       navigate("/app/page-1"); // Navigate to page 1 if the user exists
  //     } else {
  //       navigate("/page-2"); // Navigate to page 2 if the user does not exist
  //     }
  //   } catch (error) {
  //     console.error("Error checking user:", error);
  //     navigate("/error"); // Navigate to an error page if needed
  //   }
  // };

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
