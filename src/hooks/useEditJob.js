// useEditJob.js
import { useState, useEffect } from "react";
import { EDIT_JOB } from "../utils/constants";
import { useSelector } from "react-redux";

const useEditJob = (id) => {
     const [employmentType, setEmploymentType] = useState(null);
    const user = useSelector((state) => state.user);
    
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchJob = async () => {
         if (!user || !id) return; // Return if user is not logged in or ID is not provided

          const { token } = user;
          
      try {
          // const response = await fetch(`${EDIT_JOB}/${id}`);
          
          const response = await fetch(`${EDIT_JOB}${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  return { data: job, loading, error };
};

export default useEditJob;
