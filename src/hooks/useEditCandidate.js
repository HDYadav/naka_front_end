import { useEffect, useState } from "react";
import { GET_CANDIDATES_EDIT } from "../utils/constants"; // Adjust import as per your project
import { useSelector } from "react-redux";

const useEditCandidate = (id) => {
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !id) {
        setIsLoading(false);
        return; // Return if user is not logged in or ID is not provided
      }

      const { token } = user;

      try {
        const response = await fetch(`${GET_CANDIDATES_EDIT}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCandidate(data); // Assuming data structure matches your expected format
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching candidate data:", error);
        setError(error); // Handle error state if needed
        setCandidate(null); // Reset candidate data in case of error
      } finally {
        setIsLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchData();
  }, [id, user]);

  return { candidate, isLoading, error };
};

export default useEditCandidate;
