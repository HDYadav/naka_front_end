import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ADD_VENDOR } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import { COMPANY_DUPLICATE,COMPANY_DISPLAY } from "../../utils/constants";
import { Base64 } from "js-base64"; 
import LayoutHOC from '../LayoutHOC';
import CompanyProfile from './CompanyProfile';
//import CompanyLeftHOC from '../CompanyLeftHOC'; 
//import CompanyBilling from './CompanyBilling';
//import AddContact from './AddContact';
//import AddAddress from './AddAddress';

function AddVendor() {

  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const [responseData, setResponseData] = useState(null); 
  const [companyDisplayName, setCompanyDisplayName] = useState(null); 

  const [formData, setFormData] = useState({
    vendor_name: "",
    display_name: "",
    website: "",
    vednor_pic: null,
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

  const handleRadioButtonClick = (value, setFieldValue) => {
    setFormData({ ...formData, type: value });
   // console.log(value);
    //setFieldValue("type", value);
  };

  const initialValues = {
    vendor_name: "",
    display_name: "",
    website: "",
    vendor_pic: null,
    type: "",
    business_category: "",
  };

  const validationSchema = Yup.object().shape({
    vendor_name: Yup.string().required("vender Name is required"),
    display_name: Yup.string().required("Display Name is required"),
    business_category: Yup.string().required("Business Category is required"),
  });


  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const imgName = fileInputRef.current.files[0].name;
    console.log(imgName);
    setFormData({ ...formData, company_logo: imgName });
    //console.log(formData.company_logo);
  
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();
      formDataWithFile.append("vendor_name", values.vendor_name);
      formDataWithFile.append("display_name", values.display_name);
      formDataWithFile.append("vendor_website", values.website);
      formDataWithFile.append("vendor_type", values.type);
      formDataWithFile.append("business_category", values.business_category);
      formDataWithFile.append("vendor_pic", imgName);
      
      const response = await fetch(ADD_VENDOR, {
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
      navigate(`/edit_vender/${encryptedCompanyId}`);
      setSubmitting(false);
    } catch (error) {
      setFieldError("form", "An error occurred while submitting the form.");
      setSubmitting(false);
    }
  };
  return (
    <main className="p-4 sm:ml-64">
      <div className="p-4 mt-14"> 
        <div className="bg-F1F6F9 font-poppins">
          <div className="flex flex-col bg-white p-4 ">
            <div className="ms-4 flex justify-between items-center">
              <h5 className=" text-203C50 font-Vietnam text-32 font-medium ">
              New Vendor
              </h5>
              <div className="relative">
                <div>
                  <label className="switch">
                    <input type="checkbox" defaultValue="" className="sr-only peer" defaultChecked=""/>
                    <div className="relative w-11 h-6  rounded-full  peer-focus:ring-2 peer-focus:ring-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white  after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600" />
                  </label>
                </div>
              </div>
            </div>
          </div>

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
                    <Field name="vendor_name">
                      {({ field }) => (
                        <div className="mb-3">
                          <label htmlFor="vendor_name" className="block mb-2 text-535252 text-16 font-400 text-535252"> Name* </label>
                          <input
                            {...field}
                            className="inputBorder text-sm block w-full p-2.5 italic"
                            type="text"
                            placeholder="Enter Name..."
                            onKeyUp={handleKeyUp}
                          />
                          <ErrorMessage name="vendor_name" component="div" className="text-red-500 text-sm" />
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
                          <label htmlFor="display_name" className="block mb-2 text-535252 text-16  font-400"> Vender. Display Name* </label>
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
                            className="block mb-2  text-535252 text-16  font-400 " >  Website 
                          </label>
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
                        className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
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

    
  {/*<CompanyProfile />  
   <AddAddress /> 
  <AddContact />  */} 
    
    <div id="default-styled-tab-content">
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div className="bg-white p-5 h-screen m-10 overflow-x-scroll">
          <table className="min-w-full border border-neutral-200 text-center text-sm  text-surface text-2C495D font-poppins  ">
            <thead className="border-neutral-200 border ">
              <tr>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Client Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Display Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    First Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Last Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Phone Number
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Email
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Tax Number
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="border">
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 text-2999BC px-6 py-2 font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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


//export default LayoutHOC(AddCompany);

export default LayoutHOC(AddVendor);