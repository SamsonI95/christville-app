import React, { useState } from "react";
import { useTheme } from "../../Components/ThemeContect";
import axios from "axios";
import { TelegramShareButton } from "react-share";

//Icon(s)
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

const FriendPageContent = [
  {
    image: "/Frame 151.png",
    text: "Invite your friends by sharing your unique referral link!",
  },
  {
    image: "/Frame 152.png",
    text: "Invite your friends to join the christville app, where they can start playing games or take part in various activities.",
  },
  {
    image: "/Frame 153.png",
    text: "You earn boss coins, airdrop points, XP and more benefits!",
  },
];

const FriendsPage = () => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "text-customGold" : "#000000";
  const [referralKey, setReferralKey] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  // Fetch or Create User API Call
  const fetchReferralKey = async () => {
    try {
      setLoading(true);

      // Replace with your API endpoint and adjust request body as needed
      const response = await axios.post(`${apiBaseUrl}/user`, {
        telegramId: "12345", // Replace with actual Telegram ID
        username: "testuser", // Replace with actual username
      });
     
      const { user } = response.data;
      console.log("User data:", user);
      setReferralKey(user.referralKey); // Store the referral key
      console.log("Referral key:", user.referralKey);
    } catch (error) {
      console.error("Failed to fetch referral key:", error);
    } finally {
      setLoading(false);
    }
  };

  // // Handle Invite Friend Button
  // const handleInviteClick = async () => {
  //   if (!referralKey) await fetchReferralKey();
  // };

  // Handle Copy Button
  const handleCopyClick = () => {
    const referralLink = `${apiBaseUrl}/user/${referralKey}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const referralLink = `${apiBaseUrl}/user/${referralKey}`;
  const shareText =
    "Join Christville with my referral link and start playing games or taking part in exciting activities!";

  return (
    <div className={`flex flex-col font-Poppins pt-[50px] px-[28px]`}>
      <section>
        <h3 className="text-center">Friends</h3>
        <h4 className="font-bold mt-[30px] mb-4">
          Invite your friends, stack up the rewards!
        </h4>
        <p className=" opacity-50">
          The more friends you bring, the more the prizes.
        </p>
      </section>
      <section className="flex items-center justify-between mt-6">
        <h3 className="font-bold">HOW IT WORKS</h3>
        <IoMdInformationCircleOutline className="text-customGold text-2xl" />
      </section>
      <section>
        {FriendPageContent.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-4 py-4">
              <img src={item.image} alt="image" />
              <p className="font-bold">{item.text}</p>
            </div>
            {index !== FriendPageContent.length - 1 && (
              <div className="line-shape"></div>
            )}
          </div>
        ))}
      </section>
      <section className="flex items-center gap-[10px] my-8">
        <TelegramShareButton
          url={referralLink}
          title={shareText}
          className="w-full"
          onClick={async () => {
            if (!referralKey) await fetchReferralKey();
          }}
        >
          <div className="flex items-center justify-center text-[20px] bg-customGold text-white h-[48px] rounded-[14px]">
            <h3>{loading ? "Generating Link..." : "Invite Friends"}</h3>
          </div>
        </TelegramShareButton>
        <button
          onClick={handleCopyClick}
          className="flex items-center justify-center text-[20px] bg-customGold text-white w-[48px] h-[48px] rounded-[14px]"
        >
          <MdContentCopy />
        </button>
      </section>
    </div>
  );
};

export default FriendsPage;
