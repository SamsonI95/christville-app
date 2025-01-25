import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [daysSinceJoin, setDaysSinceJoin] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // Fetch the userId (e.g., from session storage or an auth state)
        const userId = sessionStorage.getItem("id");
        console.log("User ID:", userId);
        if (!userId) {
          throw new Error("User ID not found in session storage.");
        }

        // Fetch user data from the backend
        const response = await axios.get(`${apiBaseUrl}/user/${user.userId}`);

        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          throw new Error("Failed to fetch user data from the server.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data.");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false); // Stop loading
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
