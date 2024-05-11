import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { COMPANY_PROFILE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import { COMPANY_DUPLICATE,COMPANY_DISPLAY } from "../../utils/constants";
import { Base64 } from "js-base64"; 
 

function CompanyProfile() {
  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [responseData, setResponseData] = useState(null); 
  const [companyDisplayName, setCompanyDisplayName] = useState(null); 
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

/// validate mobile number
  const handleMobileNumberChange = (event) => {
    const inputMobileNumber = event.target.value;
    
    const mobileNumberPattern = /^[0-9]{10}$/;
    setIsValid(mobileNumberPattern.test(inputMobileNumber));
    setMobileNumber(inputMobileNumber);
  };


  const [formData, setFormData] = useState({
    company_name: "",
    display_name: "",
    website: "",
    country_id: "",
    company_logo: null,
  });

  const [imageSrc, setImageSrc] = useState('');
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);      
    };

    if (file) {      
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);    
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleKeyUp = async (e) => {
    const Authtoken = user.token;
    const searchedValue = e.target.value;

    if (searchedValue.length >= 4) {
      try {
        const url = `${COMPANY_DUPLICATE}?search_company=${encodeURIComponent(
          searchedValue
        )}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setResponseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, e.g., show an error message to the user
      }
    } else {
      setResponseData(null);
    }
  }; 


  const handleKeyUpDNAme = async (e) =>{

    const Authtoken = user.token;
    const searchedValue = e.target.value;

    if (searchedValue.length) {
      try {
        const url = `${COMPANY_DISPLAY}?search_company=${encodeURIComponent(
          searchedValue
        )}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCompanyDisplayName(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, e.g., show an error message to the user
      }
    } else {
      setCompanyDisplayName(null);
    }


  }


  // const handleRadioButtonClick = (value) => {
  //   setFormData({ ...formData, type: value });
  // };

  const handleRadioButtonClick = (value, setFieldValue) => {
    setFormData({ ...formData, type: value });
   // console.log(value);
    //setFieldValue("type", value);
  };

  //console.log(formData);

  

  const initialValues = {
    company_name: "",
    display_name: "",
    website: "",
    country_id: "",
    company_logo: null,
    type: "",
    business_category: "",
    legal_name: "",
    currency_id: "",
    company_phone_no: "",
    company_email: "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company Name is required"),
    display_name: Yup.string().required("Display Name is required"),
    business_category: Yup.string().required("Business Category is required"),
    country_id: Yup.string().required("Country Name is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const imgName = fileInputRef.current.files[0];
    
    setFormData({ ...formData, company_logo: imgName });
    //console.log(formData.company_logo);
    
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();
      formDataWithFile.append("company_name", values.company_name);
      formDataWithFile.append("display_name", values.display_name);
      formDataWithFile.append("company_website", values.website);
      formDataWithFile.append("company_type", values.type);
      formDataWithFile.append("business_category", values.business_category);
      formDataWithFile.append("legal_name", values.legal_name);
      formDataWithFile.append("company_logo", imgName);
      formDataWithFile.append("country_id", values.country_id);
      formDataWithFile.append("currency_id", values.currency_id);
      formDataWithFile.append("company_phone_no", values.company_phone_no);
      formDataWithFile.append("company_email", values.company_email);
      
      const response = await fetch(COMPANY_PROFILE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      const data = await response.json();
      dispatch(setProfile(data.data));
      const companyId = data.data.id;

      const companyData = {
        company_id: companyId,
        company_name: data.data.company_name,
        message: "Records Sucessfully created!",
      };
      localStorage.removeItem("company_data");
      localStorage.setItem("company_data", JSON.stringify(companyData));
      const encryptedCompanyId = Base64.encode(companyId);
      navigate(`/edit_company/${encryptedCompanyId}`);
      setSubmitting(false);
    } catch (error) {
      setFieldError("form", "An error occurred while submitting the form.");
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white mt-5 pt-5 py-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
         <Form id="companyProfileForm" encType="multipart/form-data">       
            <div className="flex px-5 justify-between mb-4">
               <div className="ps-3 gap-x-16 justify-around font-poppins flex-wrap flex grid grid-cols-2 w-[64%]">

               <Field name="company_name">
                {({ field }) => (
                 <div className="mb-3">
                   <label htmlFor="company_name" className="block mb-2 text-535252 text-16 font-400 text-535252"> Company Name* </label>
                   <input
                     {...field}
                     className="inputBorder text-sm block w-full p-2.5 italic"
                     type="text"
                     placeholder="Enter Name..."
                     onKeyUp={handleKeyUp}
                   />
                   <ErrorMessage name="company_name" component="div" className="text-red-500 text-sm" />
                   {responseData?.duplicate ? (
                        <div>
                          <span className="text-red-500 text-sm">
                            {responseData?.message}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-green-500 text-sm">
                            {responseData?.message}
                          </span>
                        </div>
                      )} 
                 </div>  
                )}
                </Field>



                <Field name="display_name">
                {({ field }) => (
                 <div >
                   <label htmlFor="display_name" className="block mb-2 text-535252 text-16  font-400"> Cust. Display Name* </label>
                   <input
                     {...field}
                     className="inputBorder text-sm  block w-full p-2.5 italic"
                     type="text"
                     placeholder="Enter Name..."
                     onKeyUp={handleKeyUpDNAme}
                   />
                   <ErrorMessage name="display_name" component="div" className="text-red-500 text-sm" />
                   {companyDisplayName?.duplicate ? (
                        <div>
                          <span className="text-red-500 text-sm">
                            {companyDisplayName?.message}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-green-500 text-sm">
                            {companyDisplayName?.message}
                          </span>
                        </div>
                      )} 
                 </div>  
                )}
                </Field>


                <Field name="website">
                {({ field }) => (
                 <div >
                  <label
                htmlFor="Website"
                className="block mb-2  text-535252 text-16  font-400 " >  Website </label>
                   <input
                     {...field}
                     className="inputBorder text-sm  block w-full p-2.5 italic"
                     type="text"
                     placeholder="Enter Name..."
                     onKeyUp={handleKeyUp}
                   />
                   <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
                   
                 </div>  
                )}
                </Field>

                <Field name="type">
                  {({ field }) => (
                    <div>
                      <div className="mb-2">
                        <label htmlFor="types" className="mb-1 text-535252 text-16 font-400">
                          Type
                        </label>
                      </div>
                      <div id="types" className="space-x-2">
                        <label>
                          <input
                          type="radio"
                          name="type"
                          value="business"
                          checked={formData.type === "business"}
                          onChange={() => handleRadioButtonClick("business")}
                          className="hidden"
                      />
                          <button
                            type="button"
                            className={`px-6 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                              formData.type  === "business" ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                            onClick={() => handleRadioButtonClick("business")}
                          >
                        Business
                    </button>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="type"
                            value="individual"
                            checked={formData.type === "individual"}
                            onChange={() => handleRadioButtonClick("individual")}
                            className="hidden"
                          />
                          <button
                            type="button"
                            className={`px-4 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                              formData.type === "individual" ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                            onClick={() => handleRadioButtonClick("individual")}
                          >
                            Individual
                          </button>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="type"
                            value="prospect"
                            checked={formData.type === "prospect"}
                            onChange={() => handleRadioButtonClick("prospect")}
                            className="hidden"
                          />
                          <button
                            type="button"
                            className={`px-4 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                              formData.type === "prospect" ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                            onClick={() => handleRadioButtonClick("prospect")}
                          >
                            Prospect
                          </button>
                        </label>
                      </div>
                    </div>
                  )}
                </Field>
              </div>
                  

              <Field name="company_logo">
              {({ field, form }) => (
                <div className="pe-2 flex justify-end w-[34%]">
                  <div
                    htmlFor="dropzone-file"
                    className="w-44 p-1 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    className="flex items-center h-40 w-40 text-center text-gray-500"
                  >
                      {imageSrc ? (
                        <img src={imageSrc} alt="Uploaded" className='w-full h-full' />
                      ) : (
                        'Drag & Drop or Click to Upload'
                      )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                  />
                  </div>                  
                </div>
              )}
            
            </Field>
            </div> 
 
      <div className="font-poppins grid grid-cols-3 px-8 mb-4 gap-16">
        <div className="">
          <label
            htmlFor="business_category"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Business Category
          </label>
          <Field
            as="select"
            id="business_category"
            name="business_category"
            className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5"
          >
            <option value="">Select category</option>
            <option value="1">Group 1</option>
            <option value="2">Group 2</option>
            <option value="3">Group 3</option>
            <option value="4">Group 4</option>
            <option value="5">Group 5</option>
          </Field>
          <ErrorMessage name="business_category" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label
            htmlFor="legal_name"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Legal Name
          </label>
          <Field
            type="text"
            id="legal_name"
            name="legal_name"
            className="inputBorder text-sm block w-full p-2.5 italic"
            placeholder="Enter legal name..."
          />
          <ErrorMessage name="legal_name" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label
            htmlFor="country_id"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Country
          </label>
          <Field
            as="select"
            id="country_id"
            name="country_id"
            className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5" 
          >
            <option value="">Select Country</option>
            <option value="1">United States of America (USA)</option>
            <option value="2">India</option>
            <option value="3">Canada</option>
            <option value="4">Australia</option>
            <option value="5">United Kingdom</option>
          </Field>
          <ErrorMessage name="country_id" component="div" className="text-red-500 text-sm" />
        </div>
      </div>
      <div className="font-poppins grid grid-cols-3 px-8 mb-4 gap-16">
        <div>
          <label
            htmlFor="currency_id"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Currency
          </label>
          <Field
            as="select"
            id="currency_id"
            name="currency_id"
            className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5"
          >
            <option value="1">USD $</option>
            <option value="2">AUD $</option>
            <option value="3">CAD $</option>
            <option value="4">CHF CHF</option>
            <option value="5">EUR €</option>
            <option value="6">GBP £</option>
            <option value="7">INR ₹</option>
            <option value="8">JPY ¥</option>
          </Field>
        </div>
        <div>
          <label
            htmlFor="company_phone_no"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Phone
          </label>
          <Field
            type="text"
            id="company_phone_no"
            name="company_phone_no"
            onChange={handleMobileNumberChange}
            className="inputBorder text-sm block w-full p-2.5"
          />
          {isValid ? (
            ''
          ) : (
            <p style={{ color: 'red' }}>Please Enter Valide  Mobile Number</p>
          )}
        </div>
        <div>
          <label
            htmlFor="company_email"
            className="block mb-1 text-535252 text-16 font-400"
          >
            Email
          </label>
          <Field
            type="email"
            id="company_email"
            name="company_email"
            className="inputBorder text-sm block w-full p-2.5"
            placeholder="Enter email..."
          />
        </div>
      </div>
      <div className="flex px-10 font-poppins pt-3 justify-between">
        <div></div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-6 py-2 text-base rounded font-normal bg-F4F4F4 focus:outline-none"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>
    </Form>
  )}
</Formik>
 
    </section>
  );
}

export default CompanyProfile;
