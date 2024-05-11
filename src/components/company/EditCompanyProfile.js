import React, { useState, useEffect, useRef } from "react";
import { BASE_URL, EDIT_PROFILE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import SuccessComponent from "./SuccessComponent ";
import Shimmer from "../Shimmer";

function EditCompanyProfile({ companyData }) {
  const user = useRequireAuth();

  const [website, setWebsite] = useState(
    companyData?.data?.company_website || ""
  );
  const [legalName, setlegalName] = useState(
    companyData?.data?.legal_name || ""
  );
  const [phoneNo, setPhoneNo] = useState(
    companyData?.data?.company_phone_no || ""
  );
  const [email, setEmail] = useState(companyData?.data?.company_email || "");
  const [uploadedImg, setUploadedImg] = useState(
    companyData?.data?.company_logo || ""
  );

  const [updatedCompanyData, setUpdatedCompanyData] = useState(null);    

  useEffect(() => {
    setWebsite(companyData?.data?.company_website || "");
    setlegalName(companyData?.data?.legal_name || "");
    setPhoneNo(companyData?.data?.company_phone_no || "");
    setEmail(companyData?.data?.company_email || "");
    setUpdatedCompanyData(companyData);
  }, [companyData]);


  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);

  const [submitted, setSubmitted] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    display_name: "",
    country_id: "",
    company_logo: null,
  });

  const [imageSrc, setImageSrc] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageSrc(uploadedImg);
  }, []);
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

  const handleClick = () => {
    fileInputRef.current.click();
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const { name, value } = event.target;
    const inputType = event.target.type;
    if(inputType === 'file'){
      const file = event.target.files[0];    
      handleFileUpload(file); 
      setFormData({ ...formData, company_logo: file });
      setSelectedImage(URL.createObjectURL(file));
    }

    if (name === "website") {
      setWebsite(value);
    } else if (name === "legal_name") {
      setlegalName(value);
    } else if (name === "company_phone_no") {
      setPhoneNo(value);
    } else if (name === "company_email") {
      setEmail(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const validateForm = () => {
  //   const errors = {};
  //   if (!formData.company_name.trim()) {
  //     errors.company_name = "Company Name is required";
  //   }
  //   if (!formData.display_name.trim()) {
  //     errors.display_name = "Display Name Required";
  //   }

  //   if (!formData.country_id.trim()) {
  //       errors.country_id = "Country Name Required";
  //   }

  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

 //console.log(companyData?.data?.company_type);

  const handleProfileSave = async () => {
    
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();
      const file = fileInputRef.current.files[0];
      formDataWithFile.append("profile_id", companyData?.data?.id);
      formDataWithFile.append("company_name", formData.company_name);
      formDataWithFile.append("display_name", formData.display_name);
      formDataWithFile.append("company_website", formData.website);
      formDataWithFile.append("company_type", formData.type);
      formDataWithFile.append("business_category", formData.business_category);
      formDataWithFile.append("legal_name", formData.legal_name);
      formDataWithFile.append("company_logo", formData.file);
      formDataWithFile.append("country_id", formData.country);
      formDataWithFile.append("currency_id", formData.currency_id);
      formDataWithFile.append("company_phone_no", formData.company_phone_no);
      formDataWithFile.append("company_email", formData.company_email);

      console.log(formDataWithFile);

      const response = await fetch(EDIT_PROFILE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      const data = await response.json();
      setSelectedImage(null);
      setUploadedImg(data.data.company_logo);
      setSuccessMessage(data.message);

      setTimeout(() => {
        setSuccessMessage("");
      }, 30000);

      setSubmitted(true);
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };
  return (
    <section className="bg-white mt-5 pt-5 py-8">
      {companyData ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          id="companyProfileForm"
          encType="multipart/form-data"
        >
          <div className="flex px-5 justify-between mb-4">
            <div className="ps-3 gap-x-16 justify-around font-poppins flex-wrap flex grid grid-cols-2 w-[64%]">
              <div className="">
                <label
                  htmlFor="company_name"
                  className="block mb-2 text-535252 text-16 font-400 text-535252"
                >
                  Company Name*
                </label>
                <input
                  className="inputBorder text-sm  block w-full p-2.5 italic"
                  type="text"
                  name="company_name"
                  value={companyData?.data?.company_name}
                  onChange={handleInputChange}
                  placeholder="Enter Name..."
                  disabled={submitted}
                  required
                />
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
              <div>
                <label
                  htmlFor="Display Name"
                  className="block mb-2 text-535252 text-16  font-400 "
                >
                  Cust. Display Name*
                </label>
                <input
                  type="text"
                  name="display_name"
                  value={companyData?.data?.display_name}
                  onChange={handleInputChange}
                  placeholder="Enter display name ..."
                  className="inputBorder text-sm  block w-full p-2.5 italic"
                  disabled={submitted}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Website"
                  className="block mb-2  text-535252 text-16  font-400 "
                >
                  Website
                </label>

                <input
                  value={website}
                  className="inputBorder text-sm block w-full p-2.5 italic"
                  type="text"
                  name="website"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="mb-2">
                  <label
                    htmlFor="types"
                    className="mb-1  text-535252 text-16  font-400 "
                  >
                    Type
                  </label>
                </div>
                <div id="types" className="space-x-2">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="business"
                      checked={updatedCompanyData?.data?.company_type === "business"}
                      onChange={handleInputChange}
                      className="hidden"
                    />

                    <button
                      type="button"
                      className={`px-6 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                        companyData?.data?.company_type === "business"
                          ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                      onClick={() => {
                        setFormData({ ...formData, type: "business" });
                        setUpdatedCompanyData({
                          ...companyData,
                          data: {
                            ...companyData.data,
                            company_type: "business",
                          },
                        });
                      }}
                    >
                      Business
                    </button>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="individual"
                      checked={updatedCompanyData?.data?.company_type === "individual"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-normal border hover:bg-gray-400 focus:outline-none option ${
                        updatedCompanyData?.data?.company_type === "individual"
                          ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                      onClick={() => {
                        setFormData({ ...formData, type: "individual" });
                        setUpdatedCompanyData({
                          ...companyData,
                          data: {
                            ...companyData.data,
                            company_type: "individual",
                          },
                        });
                      }}
                    >
                      Individual
                    </button>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="prospect"
                      checked={updatedCompanyData?.data?.company_type === "prospect"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      className={`px-4 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                        updatedCompanyData?.data?.company_type === "prospect"
                          ? "text-[#2C495D] border-[#2C495D]": "border"}`}
                      onClick={() => {
                        setFormData({ ...formData, type: "prospect" });
                        setUpdatedCompanyData({
                          ...companyData,
                          data: {
                            ...companyData.data,
                            company_type: "prospect",
                          },
                        });
                      }}
                    >
                      Prospect
                    </button>
                  </label>
                </div>                
              </div>
            </div>

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
                  {companyData ? (
                    <img src={`${BASE_URL}${companyData?.data?.company_logo}`} alt="Uploaded" className='w-full h-full' />
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
          </div>

          <div className="font-poppins grid grid-cols-3 px-8 mb-4 gap-16">
            <div className="">
              <label
                htmlFor="Business Category"
                className="block mb-1 text-535252 text-16  font-400  "
              >
                Business Category
              </label>
              <select
                id="business_category"
                name="business_category"
                className="border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5"
                value={companyData?.data?.business_category}
                onChange={handleInputChange}
                disabled={submitted}
                required
              >
                <option value="">Select category</option>
                <option value="1">Group 1</option>
                <option value="2">Group 2</option>
                <option value="3">Group 3</option>
                <option value="4">Group 4</option>
                <option value="5">Group 5</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="Legal Name"
                className="block mb-1  text-535252 text-16  font-400  "
              >
                Legal Name
              </label>

              <input
                className="inputBorder text-sm  block w-full p-2.5 italic"
                type="text"
                name="legal_name"
                value={legalName}
                onChange={handleInputChange}
                placeholder="Enter website ..."
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block mb-1  text-535252 text-16  font-400  "
              >
                Country
              </label>

              <select
                id="country_id"
                name="country_id"
                className="border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5"
                value={companyData?.data?.country_id}
                onChange={handleInputChange}
                disabled={submitted}
                required
              >
                <option value="">Select Country</option>
                <option value="1">United States of America (USA)</option>
                <option value="2">India</option>
                <option value="3">Canada</option>
                <option value="4">Australia</option>
                <option value="5">United Kingdom</option>
              </select>
            </div>
          </div>
          <div className="font-poppins grid grid-cols-3 px-8 py-3 pt-5 gap-16">
            <div>
              <label
                htmlFor="currency_id"
                className="block mb-1 text-535252 text-16  font-400  "
              >
                Currency
              </label>

              <select
                id="currency_id"
                name="currency_id"
                className="border border-gray-300 text-gray-900 text-sm block w-full px-2.5 py-0.5"
                value={companyData?.data?.currency_id}
                onChange={handleInputChange}
                disabled={submitted}
              >
                <option value="1">USD $</option>
                <option value="2">AUD $</option>
                <option value="3">CAD $</option>
                <option value="4">CHF CHF</option>
                <option value="5">EUR €</option>
                <option value="6">GBP £</option>
                <option value="7">INR ₹</option>
                <option value="8">JPY ¥</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-1  text-535252 text-16  font-400  "
              >
                Phone
              </label>
              <input
                type="text"
                id="company_phone_no"
                name="company_phone_no"
                value={phoneNo}
                onChange={handleInputChange}
                className="text-sm block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1  text-535252 text-16  font-400  "
              >
                Email
              </label>
              <input
                type="email"
                id="company_email"
                value={email}
                onChange={handleInputChange}
                name="company_email"
                className="inputBorder text-sm block w-full p-2.5 "
                placeholder=""
              />
            </div>
          </div>

          <div className="flex px-10 font-poppins pt-5 justify-between">
            <div>
              {/* <span className="p p-1 text-green-400">
                {" "}
                <SuccessComponent />{" "}
              </span> */}
              {submitted && (
                <span className="p p-1 text-green-400">{successMessage}</span>
              )}
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 text-base rounded font-normal bg-F4F4F4  focus:outline-none">
                CANCEL
              </button>
              <button
                onClick={handleProfileSave}
                type="submit"
                className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none"
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      ) : (
        <Shimmer width="100%" height="100px" />
      )}
    </section>
  );
}

export default EditCompanyProfile;
