import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";  // Import axios
import { GET_CITY_LIST } from "../utils/constants";

const useJobsPosition = () => {
  const user = useSelector((state) => state.user);  // Get user from Redux state
  const [userData, setUserData] = useState(null);   // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;  // Return if user is not logged in

      const Authtoken = user.token;  // Get auth token from user state

      try {
        // Use axios to make GET request
        const response = await axios.get(GET_CITY_LIST, {
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
        });

        console.log(response.data, "Hello");

        // If response is successful, set the userData
        setUserData(response.data);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);  // Reset userData to null in case of error
      }
    };

    fetchData();
  }, [user]);  // Effect will re-run whenever the `user` changes

  return userData;
};

export default useJobsPosition;
