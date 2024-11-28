import React, { useState } from "react";
import TopLayer from "../../Components/TopLayer";

const HomePage = () => {
  const [bibleVerse, setBibleVerse] = useState(null); // State to store the verse
  const [imageSrc, setImageSrc] = useState("/Bible2.png");

  const fetchBibleVerse = async () => {
    try {
      const response = await fetch("/daily-verse"); // Backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch Bible verse");
      }
      const data = await response.json();
      setBibleVerse(data); // Store the fetched Bible verse
      setImageSrc("/open bible.png"); // Change image after click
    } catch (error) {
      console.error("Error fetching Bible verse:", error);
    }
  };

  return (
    <div className="flex flex-col h-[50vh] font-Poppins px-[28px]">
      <TopLayer />
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-2xl">Tap to read</h3>
        {/* When image is clicked, fetch Bible verse */}
        <img
          src={imageSrc}
          alt="Bible"
          onClick={fetchBibleVerse}
          className="cursor-pointer"go 
        />

        {/* Display the Bible verse */}
        {bibleVerse && (
          <div className="mt-4">
            <h4>{bibleVerse.reference}</h4>
            <p>{bibleVerse.text}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
