import { useEffect, useState } from "react";
import { GET_JOB_POSITION } from "../utils/constants"; // Adjust import as per your project
import { useSelector } from "react-redux";

const useGetJobPosition = (id) => {

  const [positions, setPositions] = useState(null);
    const user = useSelector((state) => state.user); 
  

  useEffect(() => {
    const fetchData = async () => {
       if (!user) return; // Return if user is not logged in

      const Authtoken = user.token;
      
      try {
        //  const response = await fetch(`${GET_JOB_POSITION}${id}`);
        
        const response = await fetch(`${GET_JOB_POSITION}${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
        });
        const data = await response.json();
        setPositions(data); // Assuming data structure matches your expected format
      } catch (error) {
        console.error("Error fetching job position:", error);
        setPositions(null); // Handle error state if needed
      }
    };

    fetchData();
  }, [id]);

  return positions;
};

export default useGetJobPosition;
