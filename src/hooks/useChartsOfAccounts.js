import { useEffect, useState } from "react";
import { CHARTS_OF_ACCOUNTS } from "../utils/constants";
import useRequireAuth from "../utils/useRequireAuth";

const useChartsOfAccounts = () => {
  const auth = useRequireAuth();  
  const [chartOfAccount, setChartOfAccount] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => { 
      const Authtoken = auth.token;

     

      try {
        const response = await fetch(CHARTS_OF_ACCOUNTS, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${Authtoken}`,
              'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setChartOfAccount(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartOfAccount(null);
      }
    };

    // Fetch data only if auth.token changes
    if (auth.token) {
      fetchData();
    }
  }, [auth.token]); // Only trigger useEffect when auth.token changes

  return chartOfAccount;
};

export default useChartsOfAccounts;
