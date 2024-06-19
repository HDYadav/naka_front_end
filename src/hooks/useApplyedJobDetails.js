import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {JOB_DETAILS_ADMIN } from "../utils/constants";

const useApplyedJobDetails = (id) => {

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Return if user is not logged in

      const Authtoken = user.token;

      try {
        const response = await fetch(JOB_DETAILS_ADMIN + id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch  data");
        }

        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    fetchData();
  }, [user]);

  return userData;
};

export default useApplyedJobDetails;
