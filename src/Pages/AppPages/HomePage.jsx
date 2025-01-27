import React, { useContext, useEffect, useState } from "react";
import TopLayer from "../../Components/TopLayer";
import { useTheme } from "../../Components/ThemeContect";
import { FaHeart } from "react-icons/fa6";
import { MdBookmarks } from "react-icons/md";
import { SendIcon } from "../../Icons/Icons";
import { UserContext, useUserContext } from "../../Usercontext";
import axios from "axios";

const HomePage = () => {
  // const { user } = useContext(UserContext);
  const { user } = useUserContext();
  const [bonusMessage, setBonusMessage] = useState(null); // Store success/error messages
  const [loading, setLoading] = useState(false);

  const [bibleVerse, setBibleVerse] = useState(null); // State to store the verse
  const [imageSrc, setImageSrc] = useState("/Bible2.png");
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#ffffff" : "#FFFFFF";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  const fetchDailyVerseAndBonus = async () => {
    try {
      // Fetch the daily verse
      const response = await axios.get(`${apiBaseUrl}/daily-verse`);
      console.log("Fetched daily verse response:", response);

      if (response.data) {
        setBibleVerse(response.data); // Store the fetched Bible verse
        setImageSrc("/open bible.png"); // Change image after a successful fetch
      } else {
        console.error("No verse data found in the response.");
      }

      // Check User ID for daily bonus allocation

      if (!user || !user.id) {
        console.error(
          "User ID is not available in the context for claiming the bonus."
        );
        return;
      }

      const userId = user.id; // Get the userId from the context
      console.log("Using userId for daily bonus:", userId);

      // Allocate the daily bonus
      const bonusResponse = await axios.post(
        `${apiBaseUrl}/claim-daily-bonus/${userId}`
      );
      console.log("Daily bonus allocated:", bonusResponse.data?.message);
    } catch (error) {
      console.error(
        "Error fetching daily verse or allocating bonus:",
        error.response?.data || error.message
      );
    }
  };

  // const fetchBibleVerse = async () => {
  //   try {
  //     const response = await fetch(`${apiBaseUrl}/daily-verse`); // Backend URL changed in the env folder
  //     console.log("Response:", response);
  //     if (!response.ok) {
  //       const errorText = await response.text(); // Capture any server error message
  //       throw new Error(`Error: ${response.status} - ${errorText}`);
  //     }
  //     const data = await response.json();
  //     setBibleVerse(data); // Store the fetched Bible verse
  //     setImageSrc("/open bible.png"); // Change image after click
  //   } catch (error) {
  //     console.error("Error fetching Bible verse:", error);
  //   }
  // };

  const toggleLike = () => {
    setLikes((prevLikes) => prevLikes + 1); // Increment likes
  };

  const toggleBookmark = () => {
    setBookmarked((prevBookmarked) => !prevBookmarked); // Toggle bookmark state
  };

  const shareMessage = () => {
    if (bibleVerse) {
      const message = `Verse of the Day: ${bibleVerse.reference} - "${bibleVerse.text}"`;
      // Share API for mobile or fallback for desktop
      if (navigator.share) {
        navigator
          .share({
            title: "Bible Verse",
            text: message,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        console.log("Fallback sharing:", message);
        alert(`Share this verse:\n${message}`);
      }
    }
  };

  return (
    <div className="flex flex-col h-[50vh] font-Poppins px-[28px]">
      <TopLayer />
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-2xl mt-8 mb-5">Tap to read</h3>
        {/* When image is clicked, fetch Bible verse */}
        <button
          onTouchStart={fetchDailyVerseAndBonus}
          onClick={fetchDailyVerseAndBonus}
        >
          <img src={imageSrc} alt="Bible" className="cursor-pointer" go />
        </button>
        {/* Display the Bible verse */}
        {bibleVerse && (
          <div className="mt-4">
            <h3>Verse of the day</h3>
            <h4 className="font-semibold pt-3">{bibleVerse.reference}</h4>
            <p className="pt-[21px] pb-[24px]">- "{bibleVerse.text}"</p>

            {/* Bonus Message */}
            {bonusMessage && (
              <p className="text-green-600 mt-2">{bonusMessage}</p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <section className="space-x-4">
                {/* Like Button */}
                <button onClick={toggleLike} aria-label="Like">
                  <FaHeart
                    style={{
                      color: likes ? "red" : "black", // Change color when liked
                      fontSize: "24px",
                    }}
                  />
                </button>

                {/* Share Button */}
                <button onClick={shareMessage} aria-label="Share">
                  <SendIcon />
                </button>
              </section>

              {/* Bookmark Button */}
              <button onClick={toggleBookmark} aria-label="Bookmark">
                <MdBookmarks
                  style={{
                    color: bookmarked ? "#FFD700" : "black", // Custom color for bookmarked
                    fontSize: "24px",
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
