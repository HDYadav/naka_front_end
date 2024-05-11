import React, { useState } from "react";
import { COMPANY_PROFILE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import { COMPANY_DUPLICATE } from "../../utils/constants";
import { Base64 } from "js-base64";

function CompanyProfile() {
  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null); 
  

  //const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    display_name: "",
    website: "",
    country_id: "",
    company_logo: null,
  });

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


 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.company_name.trim()) {
      errors.company_name = "Company Name is required";
    }
    if (!formData.display_name.trim()) {
      errors.display_name = "Display Name Required";
    }

    if (!formData.country_id.trim()) {
      errors.country_id = "Country Name Required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // console.log(formData.type);


  const handleRadioButtonClick = (value) => {
    setFormData({ ...formData, type: value });
};

console.log(formData);


  const handleProfileSave = async () => {
    if (validateForm()) {
      try {
        const Authtoken = user.token;
        const formDataWithFile = new FormData();
        formDataWithFile.append("company_name", formData.company_name);
        formDataWithFile.append("display_name", formData.display_name);
        formDataWithFile.append("company_website", formData.website);
        formDataWithFile.append("company_type", formData.type);
        formDataWithFile.append(
          "business_category",
          formData.business_category
        );
        formDataWithFile.append("legal_name", formData.legal_name);
        formDataWithFile.append("company_logo", formData.company_logo);
        formDataWithFile.append("country_id", formData.country_id);
        formDataWithFile.append("currency_id", formData.currency_id);
        formDataWithFile.append("company_phone_no", formData.company_phone_no);
        formDataWithFile.append("company_email", formData.company_email);

        const response = await fetch(COMPANY_PROFILE, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
          body: formDataWithFile,
        });

        const data = await response.json();

        //   console.log(data)
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
       /// navigate(`/edit_company/${companyId}`);
        setSuccessMessage(data.message);
      } catch (error) {
        setError("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <section className="bg-white mt-5 pt-5 py-8">
      <form
        onSubmit={(e) => e.preventDefault()}
        id="companyProfileForm"
        encType="multipart/form-data"
      >
        <div className="flex  px-5 justify-between">
          <div className="ms-4 gap-x-16 justify-around font-poppins flex-wrap flex grid grid-cols-2 w-[64%]">
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
                value={formData.company_name}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                placeholder="Enter Name..."
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
                value={formData.display_name}
                onChange={handleInputChange}
                placeholder="Enter display name ..."
                className="inputBorder text-sm  block w-full p-2.5 italic"
                required
              />
              {/* {formErrors.display_name && (
                <span className="text-red-500 text-sm">{formErrors.display_name}</span>
              )} */}
            </div>

            <div>
              <label
                htmlFor="Website"
                className="block mb-2  text-535252 text-16  font-400 "
              >
                Website
              </label>

              <input
                className="inputBorder text-sm  block w-full p-2.5 italic"
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter website ..."
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


 <div id="types" className="space-x-4">
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
                          formData.type === "business" ? "bg-gray-400 text-black" : ""
                      }`}
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
            onChange={handleInputChange}
            className="hidden"
        />
        <button
            type="button"
            className={`px-4 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                formData.type === "individual" ? "bg-gray-400 text-black" : ""
            }`}
            onClick={() => setFormData({ ...formData, type: "individual" })}
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
            onChange={handleInputChange}
            className="hidden"
        />
        <button
            type="button"
            className={`px-4 py-2 text-sm font-normal border bg-white hover:bg-gray-300 focus:outline-none option ${
                formData.type === "prospect" ? "bg-gray-400 text-black" : ""
            }`}
            onClick={() => setFormData({ ...formData, type: "prospect" })}
        >
            Prospect
        </button>
    </label>
</div>





            </div>
          </div>

          {selectedImage ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6 h-1/2">
              <img
                src={selectedImage}
                alt="Uploaded File"
                className="h-36 w-36"
              />
            </div>
          ) : (
            <div className="font-poppins pt-10 pr-8">
              <div className="flex items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500 px-10 pt-5">
                      Drop File
                    </p>
                    <p className="text-xs text-gray-500 pb-5">Here To Upload</p>
                  </div>
                  <input
                    name="company_logo"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFormData({ ...formData, company_logo: file });
                      setSelectedImage(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="font-poppins grid grid-cols-3 px-8 py-3 pt-5 gap-16">
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
              className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              value={formData.business_category}
              onChange={handleInputChange}
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
              value={formData.legal_name}
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
              className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              value={formData.country_id}
              onChange={handleInputChange}
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
              id="country_id"
              name="currency_id"
              className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              value={formData.currency_id}
              onChange={handleInputChange}
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
              value={formData.company_phone_no}
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
              value={formData.company_email}
              onChange={handleInputChange}
              name="company_email"
              className="inputBorder text-sm block w-full p-2.5 "
              placeholder=""
            />
          </div>
        </div>
        <div className="flex px-10 font-poppins pt-5 justify-between">
          <div></div>
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
    </section>
  );
}

export default CompanyProfile;
