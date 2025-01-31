import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "../../Components/ThemeContect";
import axios from "axios";
import { TelegramShareButton } from "react-share";
import { UserContext } from "../../Usercontext";

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
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [bonusToken, setBonusToken] = useState(0);
  const { user, loading: userLoading, fetchUserById } = useContext(UserContext);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  // Fetch or Create User API Call
  const fetchReferralKey = async () => {
    if (!user) {
      console.error("User context is not available.");
      return;
    }
    try {
      setLoading(true);
      console.log("User ID from context:", user.id);

      const response = await axios.post(`${apiBaseUrl}/user`, {
        telegramId: user.telegramId,
        username: user.username,
      });

      const { user: newUser } = response.data;
      console.log("User data:", newUser);
      setReferralKey(newUser.referralKey); // Store the referral key
      console.log("Referral key:", newUser.referralKey);

      // Fetch invited users
      await fetchInvitedUsers(newUser.id);

      // Check and claim bonuses
      await checkAndClaimBonuses(newUser.id);
    } catch (error) {
      console.error("Failed to fetch referral key:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Invited Users API Call
  const fetchInvitedUsers = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined.");
      return;
    }
    try {
      const response = await axios.get(
        `${apiBaseUrl}/referred-users/${userId}`
      );
      setInvitedUsers(response.data.referredUsers || []);
      console.log("Invited users:", response.data.referredUsers);
    } catch (error) {
      console.error("Failed to fetch invited users:", error);
      setInvitedUsers([]);
    }
  };

  // Check and Claim Bonuses
  const checkAndClaimBonuses = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined.");
      return;
    }
    try {
      // Check for 3 invite bonus
      let bonusResponse = await axios.post(
        `${apiBaseUrl}/task/invite-3/${userId}`
      );
      console.log("3 Invite Bonus:", bonusResponse.data.bonus);
      if (bonusResponse.data.bonus > 0) {
        setBonusToken(
          (prevBonusToken) => prevBonusToken + bonusResponse.data.bonus
        );
        console.log("Bonus claimed for 3 invites:", bonusResponse.data.bonus);
      } else {
        console.log("No bonus for 3 invites.");
      }

      // Check for 7 invite bonus
      bonusResponse = await axios.post(`${apiBaseUrl}/task/invite-7/${userId}`);
      console.log("7 Invite Bonus:", bonusResponse.data.bonus);
      if (bonusResponse.data.bonus > 0) {
        setBonusToken(
          (prevBonusToken) => prevBonusToken + bonusResponse.data.bonus
        );
        console.log("Bonus claimed for 7 invites:", bonusResponse.data.bonus);
      } else {
        console.log("No bonus for 7 invites.");
      }

      // Update user token in context only if bonus is earned
      if (bonusResponse.data.bonus > 0) {
        console.log(
          "Updating user token in context with bonus:",
          bonusResponse.data.bonus
        );
        const updatedUser = {
          ...user,
          token: user.token + bonusResponse.data.bonus,
        };
        fetchUserById(updatedUser.id); // Assuming fetchUserById updates the user context
      } else {
        console.log("No bonus to update user token.");
      }
    } catch (error) {
      console.error("Failed to check and claim bonuses:", error);
    }
  };

  // Handle Copy Button
  const handleCopyClick = () => {
    const referralLink = `${apiBaseUrl}/user/${referralKey}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const referralLink = `${apiBaseUrl}/user/${referralKey}`;
  const shareText =
    "Join Christville with my referral link and start playing games or taking part in exciting activities!";

  // Fetch referral key on component mount if user context is available
  useEffect(() => {
    if (!userLoading && user && !referralKey) {
      fetchReferralKey();
    }
  }, [user, userLoading, referralKey]);

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
        {Array.isArray(invitedUsers) && invitedUsers.length > 0 ? (
          <div>
            <h4 className="font-bold mb-4">Invited Friends</h4>
            <ul>
              {invitedUsers.map((user, index) => (
                <li key={index} className="mb-2">
                  {user.username}{" "}
                  {/* Adjust based on your user data structure */}
                </li>
              ))}
            </ul>
            <p className="opacity-50 mt-4">
              You have earned {bonusToken} boss coins!
            </p>
          </div>
        ) : (
          <div>
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
          </div>
        )}
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
