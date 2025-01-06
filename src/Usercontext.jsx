import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [daysSinceJoin, setDaysSinceJoin] = useState(null);

  useEffect(() => {
    // Simulate fetching user data (e.g., from an API or localStorage)
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        console.warn("No user data found in storage");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, daysSinceJoin, setDaysSinceJoin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
