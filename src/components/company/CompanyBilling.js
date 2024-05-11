import React, { useState, useEffect } from 'react';
import useRequireAuth from '../../utils/useRequireAuth';
import { SAVE_BILLING } from '../../utils/constants';
import { useSelector } from 'react-redux';

export default function CompanyBilling() {
    const user = useRequireAuth();
    const profile = useSelector(store => store.profile);    
    const company_profile_id =  profile.addProfile ? profile.addProfile.id : null; 

    const [billSubmitted, setBillSubmitted] = useState(false);
    const [successBillMessage, setSuccessBillMessage] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');


    const [billingFormData, setBillingFormData] = useState({
        company_profile_id: company_profile_id,
        incom_tax_no: '',
        gst_no: '',  
        accounting_method_id: '1',  
        tax_form_id: '1',  
    });

    useEffect(() => {
        setBillingFormData(prevFormData => ({
            ...prevFormData,
            company_profile_id: company_profile_id
        }));
    }, [company_profile_id]);


    const handleInputBillingChange = (event) => {
        const { name, value } = event.target;
        setBillingFormData({
            ...billingFormData,
            [name]: value
        });
    };

    const handleBillSave = async () => {        

        try {
            const Authtoken = user.token;

            const formData = new FormData();
            formData.append('company_profile_id', billingFormData.company_profile_id);
            formData.append('incom_tax_no', billingFormData.incom_tax_no);
            formData.append('gst_no', billingFormData.gst_no); 
            formData.append('accounting_method_id', billingFormData.accounting_method_id); 
            formData.append('tax_form_id', billingFormData.tax_form_id);  
           
            const response = await fetch(SAVE_BILLING, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Authtoken}`,
                },
                body: formData,
            });

            const data = await response.json(); 
           
            setSuccessBillMessage(data.message);
            setBillSubmitted(true);
            setTimeout(() => {
              //  billSubmitted(false);
                setSuccessBillMessage('');
            }, 10000);
            // if(data.success == true){
            //     setBillSubmitted(true);
            // }
            
        } catch (error) {
            setBillSubmitted(false);
            setSuccessBillMessage('');
          //  console.log(error.response.data.message);
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
                                value={billingFormData.incom_tax_no}
                                onChange={handleInputBillingChange}
                                placeholder="Enter Name..."
                                disabled={billSubmitted}
                            />
                        </div>
                        <div>
                            <label htmlFor="GST No." className="block mb-1 text-535252 text-16 font-400">
                                GST No.
                            </label>
                            <input
                                type="text"
                                name="gst_no"
                                value={billingFormData.gst_no}
                                onChange={handleInputBillingChange}
                                className="text-sm block w-full p-2.5"
                                placeholder="Enter GST Number .."
                                disabled={billSubmitted}
                            />
                        </div>
                        <div>
                            <label htmlFor="Accounting Method" className="block mb-1 text-535252 text-16 font-400">
                                Accounting Method
                            </label>
                            <select
                                name='accounting_method_id'
                                value={billingFormData.accounting_method_id}
                                onChange={handleInputBillingChange}
                                className="form-select text-sm block w-full px-2.5"
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
                                value={billingFormData.tax_form_id}
                                onChange={handleInputBillingChange}
                                className="form-select text-sm block w-full px-2.5"
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
                        <div></div>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 text-base rounded font-normal bg-F4F4F4 focus:outline-none" disabled={true}>
                                CANCEL
                            </button>
                            <button onClick={handleBillSave} type='button' className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none pointer-events-none opacity-50" disabled={true}>
                                SAVE
                            </button>
                        </div>
                    </div>
                </form> 

                {billSubmitted && (
                    <div className='p-10 text-green-400'>{successBillMessage}</div>
                )}
 

                {errorMessage && (
                <div className='p-10 text-red-400'>{errorMessage}</div> )} 

            </section>
        </div>
    );
}
