import React from "react";

const LoadingScreen = ({ image, altText = "Loading...", className = "" }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white ${className}`}
    >
      <img src={image} alt={altText} />
    </div>
  );
};

export default LoadingScreen;
