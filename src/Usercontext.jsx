import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [daysSinceJoin, setDaysSinceJoin] = useState(null);
  const [error, setError] = useState(null);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from the backend
        const response = await axios.get(`${apiBaseUrl}/user/${userId}`);

        if (response.status === 200 && response.data.user) {
          setUser(response.data.user); // Set the user data in state
        } else {
          console.warn("User not found or invalid response from backend");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message || "Failed to fetch user");
      }
    };

    fetchUser(); // Call the fetch function on component mount
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
