import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//icon(s)
import { FaCircleChevronRight } from "react-icons/fa6";

//Component(s)
import LoadingScreen from "../Components/LoadingScreen";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/page-2");
    }, 3000);
  };
  return (
    <div className="pt-[81px] px-[26px]">
      <div className="">
        <img
          className="w-[342px] h-[313px]"
          src="/vecteezy_ai-generated-close-up-of-cute-cartoon-jesus-christ-icon_42353353 1.png"
          alt="jesus-icon"
        />
        <p className="font-Inria font-bold text-[36px] text-customGold text-center py-8">
          Christville
        </p>
      </div>
      <p className="font-Poppins text-[18px] text-center">
        Welcome to Faith, the ultimate Bible token designed to enrich your
        spiritual journey
      </p>
      <div className="flex flex-col items-center justify-center">
        {isLoading && (
          <LoadingScreen
            image="/Bible.png" // Replace with the actual image path
            altText="Loading..."
          />
        )}
        {!isLoading && (
          <button
            className="text-[55px] py-[50px] text-customGold"
            onClick={handleClick}
          >
            <FaCircleChevronRight />
          </button>
        )}
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
