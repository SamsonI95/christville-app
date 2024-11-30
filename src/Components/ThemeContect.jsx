// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Access Telegram Web App API
    const tg = window.Telegram?.WebApp;

    if (tg) {
      // Check initial theme
      setIsDarkMode(tg.themeParams?.theme === "dark");

      // Listen for theme changes
      tg.onEvent("themeChanged", () => {
        setIsDarkMode(tg.themeParams?.theme === "dark");
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
