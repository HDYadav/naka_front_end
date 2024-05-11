import React, { useEffect, useState } from 'react';
import CompanyLeftHOC from '../CompanyLeftHOC';
import AddContact from './AddContact';
import AddAddress from './AddAddress';
import EditCompanyProfile from './EditCompanyProfile';
 import useCompanyEditData from '../../utils/company/useCompanyEditData';
import EdiCompanyBilling from './EditCompanyBilling';
import EditAddress from './EditAddress';
import EditContact from './EditContact';
 

const EditCompany = () => {  

    const companyLocalData = localStorage.getItem("company_data");
    const parsedCompanyData = JSON.parse(companyLocalData);
    const company_profile_id = parsedCompanyData.company_id;

    const companyData = useCompanyEditData(company_profile_id);  

    return(
        <main className="p-4 sm:ml-64">
      <div className="p-4 mt-14"> 
    <div className="bg-F1F6F9 font-poppins">
    <div className="flex flex-col bg-white p-4 ">
      <div className="ms-4 flex justify-between items-center">
        <h5 className=" text-203C50 font-Vietnam text-32 font-medium ">
         {companyData?.data?.company_name }
        </h5>
        <div className="relative">
          <div>
            <label className="switch">
              <input type="checkbox" defaultValue="" className="sr-only peer" defaultChecked=""
              />
              <div className="relative w-11 h-6  rounded-full  peer-focus:ring-2 peer-focus:ring-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white  after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600" />
            </label>
          </div>
        </div>
      </div>
    </div>

    
  <EditCompanyProfile companyData={companyData}/>  
  <EdiCompanyBilling company_id={companyData?.data?.id}  />
  <EditAddress  company_id={companyData?.data?.id} /> 
  <EditContact />  
    
    <div id="default-styled-tab-content">
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
       
      </div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      ></div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-settings"
        role="tabpanel"
        aria-labelledby="settings-tab"
      ></div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-contacts"
        role="tabpanel"
        aria-labelledby="contacts-tab"
      ></div>
    </div>
  </div>
  </div>

  </main>
    )
}

//export default EditCompany;

export default CompanyLeftHOC(EditCompany);