import { useEffect, useState } from "react";
import useRequireAuth from "../useRequireAuth";
import { COMPANY_BILLING_DETAIL} from "../constants";

const useEdiCompanyBilling = (company_profile_id) => {
    const user = useRequireAuth();
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Authtoken = user.token;
                
                const url = `${COMPANY_BILLING_DETAIL}?profile_id=${encodeURIComponent(company_profile_id)}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${Authtoken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCompanyData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [user.token, company_profile_id]);

    return companyData;
};

export default useEdiCompanyBilling;
