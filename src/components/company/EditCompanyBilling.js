import React, { useState, useEffect } from 'react';
import useRequireAuth from '../../utils/useRequireAuth';
import { SAVE_BILLING } from '../../utils/constants';
import useEdiCompanyBilling from '../../utils/company/useEdiCompanyBilling';
import Shimmer from "../Shimmer";
import { deleteDoc } from 'firebase/firestore';

const EdiCompanyBilling = () => {
    const user = useRequireAuth(); 
    const companyLocalData = localStorage.getItem("company_data");
    const parsedCompanyData = JSON.parse(companyLocalData);
    const company_profile_id = parsedCompanyData.company_id;

   // console.log(company_profile_id);

    const data =  useEdiCompanyBilling(company_profile_id);

    const [incomTaxNo, setIncomTaxNo] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [accoutingMethodID, setAccoutingMethodID] = useState('');
    const [taxFromID, setTaxFromID] = useState('');
    const [companyID,setCcompanyID] = useState('');

    useEffect(() => {
        setIncomTaxNo(data?.data?.incom_tax_no || '');
        setGstNo(data?.data?.gst_no || '');
        setAccoutingMethodID(data?.data?.accounting_method_id || '');
        setTaxFromID(data?.data?.tax_form_id || '');
        setCcompanyID(company_profile_id || '');
    }, [data]);

    //console.log(data);

    const [billSubmitted, setBillSubmitted] = useState(false);
    const [successBillMessage, setSuccessBillMessage] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');

    //setBillSubmitted(true); 

    const handleInputBillingChange = (event) => {
        const { name, value } = event.target;
        if (name === 'incom_tax_no') {
            setIncomTaxNo(value);
        } else if (name === 'gst_no') {
            setGstNo(value);
        } else if (name === 'accounting_method_id') {
            setAccoutingMethodID(value);
        } else if (name === 'tax_form_id') {
            setTaxFromID(value);
        }
        
    };

  //  console.log(data?.data?.incom_tax_no,55);


    const handleBillSave = async () => {   
 
        try {
            const Authtoken = user.token;
            const formData = new FormData(); 
            formData.append('billing_id', data?.data?.id);
            formData.append('company_profile_id', companyID);
            formData.append('incom_tax_no', incomTaxNo);
            formData.append('gst_no', gstNo); 
            formData.append('accounting_method_id', accoutingMethodID); 
            formData.append('tax_form_id', taxFromID);  
           
            const response = await fetch(SAVE_BILLING, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Authtoken}`,
                },
                body: formData,
            });

            const responseData = await response.json(); 
            setSuccessBillMessage(responseData.message);
            setBillSubmitted(true);
            setTimeout(() => {
                setSuccessBillMessage('');
                setBillSubmitted(false);
            }, 10000);
        } catch (error) {
            setBillSubmitted(false);
            setSuccessBillMessage('');
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while submitting the form.');
            }
        }
    };

    return (
        <div>
            <section className="links bg-white mt-5 pt-5 py-10">
            {/* data?.data */}
            {data ? (
               
                <form id="companyBillingForm" encType="multipart/form-data">
                    <div className="font-poppins grid grid-cols-3 px-8 py-3 pt-5 gap-16">
                        <div>
                            <label htmlFor="Income Tax No." className="block mb-1 text-535252 text-16 font-400">
                                Income Tax No.
                            </label>
                            <input
                                className="inputBorder text-sm block w-full p-2.5"
                                type="text"
                                name="incom_tax_no"
                                value={incomTaxNo}
                                onChange={handleInputBillingChange}
                                placeholder="Income Tax No..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="GST No." className="block mb-1 text-535252 text-16 font-400">
                                GST No.
                            </label>
                            <input
                                type="text"
                                name="gst_no"
                                value={gstNo}
                                onChange={handleInputBillingChange}
                                className="text-sm block w-full p-2.5"
                                placeholder="Enter GST Number .."
                               
                            />
                        </div>
                        <div>
                            <label htmlFor="Accounting Method" className="block mb-1 text-535252 text-16 font-400">
                                Accounting Method
                            </label>
                            <select
                                name='accounting_method_id'
                                value={accoutingMethodID}
                                onChange={handleInputBillingChange}
                                className="text-sm block w-full px-2.5 py-0.5"
                                disabled={billSubmitted}
                            >
                                <option value="1">Group 1</option>
                                <option value="2">Group 2</option>
                                <option value="3">Group 3</option>
                                <option value="4">Group 4</option>
                                <option value="5">Group 5</option>
                            </select>
                        </div>
                    </div>
                    <div className="font-poppins grid grid-cols-3 px-8 py-3 pt-5 gap-16">
                        <div>
                            <label htmlFor="Tax Form" className="block mb-1 text-16 font-400 text-535252">
                                Tax Form
                            </label>
                            <select
                                name='tax_form_id'
                                value={taxFromID}
                                onChange={handleInputBillingChange}
                                className="text-sm block w-full px-2.5 py-0.5"
                                disabled={billSubmitted}
                            >
                                <option value="1">Group 1</option>
                                <option value="2">Group 2</option>
                                <option value="3">Group 3</option>
                                <option value="4">Group 4</option>
                                <option value="5">Group 5</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex px-10 font-poppins pt-5 justify-between">
                    <div>  {billSubmitted && (<span className="p p-1 text-green-400">{successBillMessage}</span> )} </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 text-base rounded font-normal bg-F4F4F4 focus:outline-none" disabled={billSubmitted}>
                                CANCEL
                            </button>
                            <button onClick={handleBillSave} type='button' className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none" disabled={billSubmitted}>
                                SAVE
                            </button>
                        </div>
                    </div>
                </form>  

            ):(
                <Shimmer width="100%" height="100px" />
            )} 
                

            </section>
        </div>
    );
}

export default EdiCompanyBilling