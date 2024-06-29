import { useEffect, useState } from "react";
import { EDIT_EMPLOYER, GET_EMPLOYER_EDIT } from "../utils/constants"; // Adjust import as per your project
import { useSelector } from "react-redux";

const useEditEmployer = (id) => {
  const [employmentType, setEmploymentType] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !id) return; // Return if user is not logged in or ID is not provided

      const { token } = user;

      try {
        const response = await fetch(`${GET_EMPLOYER_EDIT}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmploymentType(data); // Assuming data structure matches your expected format
      } catch (error) {
        console.error("Error fetching employment type:", error);
        setEmploymentType(null); // Handle error state if needed
      }
    };

    fetchData();
  }, [id, user]);

  return employmentType;
};

export default useEditEmployer;
