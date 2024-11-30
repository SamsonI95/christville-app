import React from "react";
import { useTheme } from "../../Components/ThemeContect";

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
  const textColor = isDarkMode ? "#FFFFFF" : "#000000";

  return (
    <div
      className="flex flex-col font-Poppins pt-[50px] px-[28px]"
      style={{ color: textColor }}
    >
      <section>
        <h3 className="text-center">Friends</h3>
        <h4 className="font-bold mt-[30px] mb-4">
          Invite your friends, stack up the rewards!
        </h4>
        <p className="text-[#000000] opacity-50">
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
        <button className="text-[20px] bg-customGold text-white w-[280px] h-[48px] rounded-[14px]">
          Invite Friends
        </button>
        <button className="flex items-center justify-center text-[20px] bg-customGold text-white w-[48px] h-[48px] rounded-[14px]">
          <MdContentCopy />
        </button>
      </section>
    </div>
  );
};

export default FriendsPage;
