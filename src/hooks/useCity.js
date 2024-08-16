import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_CITY_LIST } from "../utils/constants";

const useCity = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.token) {
        console.error("User is not logged in or token is missing");
        return;
      }

      const Authtoken = user.token;

      try {
        const response = await fetch(GET_CITY_LIST, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
            // Add other headers if needed
            "Content-Type": "application/json", // Optional, depends on your API
          },
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(
            `Failed to fetch data: ${response.status} - ${errorDetails}`
          );
        }

        // Parse the JSON data from the response
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        // Log the error to the console
        console.error("Error fetching user data:", error);
        setUserData(null); // Optionally reset the state on error
      }
    };

    fetchData();
  }, [user]);

  return userData;
};

export default useCity;
