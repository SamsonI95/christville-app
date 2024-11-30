// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("#333"); // Default text color

  return (
    <ThemeContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
