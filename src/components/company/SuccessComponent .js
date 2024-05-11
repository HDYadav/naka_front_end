import React, { useState, useEffect } from 'react';

const SuccessComponent = () => { 
    

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const companyLocalData = localStorage.getItem("company_data");
    const parsedCompanyData = JSON.parse(companyLocalData);
    const message = parsedCompanyData.message;
    if (message) {
      setSuccessMessage(message);
      // Clear the message from local storage after 10 seconds
      setTimeout(() => {
       // localStorage.removeItem('message');

       let companyData = JSON.parse(localStorage.getItem("company_data")) || {}; 
        if (companyData.hasOwnProperty("message")) {
            delete companyData.message;
        } 
         localStorage.setItem("company_data", JSON.stringify(companyData)); 
         //console.log("Successfully removed 'message' property from companyData in local storage"); 

        setSuccessMessage('');
      }, 10000);
    }
  }, []);

  return (
    <div>
      {successMessage && (
        <div>
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SuccessComponent;
