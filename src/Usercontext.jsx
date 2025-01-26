import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [daysSinceJoin, setDaysSinceJoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // Dynamically fetch userId from query parameters
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("id");

        if (!userId) {
          throw new Error("No userId provided in the query parameters.");
        }

        const response = await axios.get(`${apiBaseUrl}/user/${userId}`);

        if (response.data && response.data.user) {
          const userData = response.data.user;
          setUser(userData); // Store the full user object

          // Calculate the number of days since user joined
          if (userData.createdAt) {
            const createdAt = new Date(userData.createdAt);
            const today = new Date();
            const diffInTime = today.getTime() - createdAt.getTime();
            const days = Math.floor(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
            setDaysSinceJoin(days);
          } else {
            throw new Error("User's createdAt date is missing.");
          }
        } else {
          throw new Error("User data not found in the response.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Fetch user details on component mount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, daysSinceJoin, setDaysSinceJoin, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
