import React, { useState } from "react";
import useChartsOfAccounts from "../../hooks/useChartsOfAccounts";

const AddAccount = ({ isOpen, onClose }) => {
  
  const chartOfAccounts = useChartsOfAccounts();
  
  const [formData, setFormData] = useState({
    accno: "",
    accountName: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });    
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accno) {
      newErrors.accno = "Select an option";
    }
    if (!formData.accountName) {
      newErrors.accountName = "Enter Account Name";
    }
    if (!formData.accountNumber) {
      newErrors.accountNumber = "Enter Account Number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted HHHH:", formData);
    
    if (validateForm()) {
     

      setFormData({
        accno: "",
        accountName: "",
        accountNumber: "",
      });
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  return (
    <div className="fixed inset-y-0 inset-x-150 z-[999] grid h-screen w-5/6 place-items-center bg-black bg-opacity-0 transition-opacity duration-300">
      <div className="relative p-4 mt-10 bg-white border border-E5ECF0 font-poppins leading-relaxed antialiased shadow-1">
        <div className="p-4">
          <div className="flex items-center justify-between p-4 md:p-3 border-b border-BECBD3 rounded-t">
            <h3 className="text-2xl text-2C495D">New Account (L3)</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-454545 bg-transparent hover:bg-F1F5F8 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="assets-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="p-3 md:px-0">
              <label htmlFor="accno" className="block mb-2 text-sm text-434852">
                Save Account Under *
              </label>

              <select
                id="accno"
                name="accno"
                value={formData.accno}
                onChange={handleChange}
                className="form-select bg-white border border-DFE2E5 text-gray-900 text-sm block w-full px-2.5"
              >
                {chartOfAccounts &&
                  chartOfAccounts.map((item) => (
                    <optgroup key={item.id} label={item.name} className="">
                      {item.children &&
                        item.children.map((child) => (
                          <option key={child.id} value={child.id}>
                            &nbsp;&nbsp; {child.identification_no+' - '+child.name}
                          </option>
                        ))}
                    </optgroup>
                  ))}
              </select>

              <div className="text-sm text-red-400">{errors.accno}</div>
            </div>
            <div className="flex flex-row px-0">
              <div className="basis-3/5 mb-3 pe-3">
                <label
                  htmlFor="accountName"
                  className="block mb-2 text-sm text-434852"
                >
                  Account Name *
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  className="bg-white border border-DFE2E5 text-gray-900 text-sm block w-full p-2.5"
                />
                <div className="text-sm text-red-400">{errors.accountName}</div>
              </div>
              <div className="basis-2/5 mb-3">
                <label
                  htmlFor="accountNumber"
                  className="block mb-2 text-sm text-434852"
                >
                  Account Number *
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="bg-white border border-DFE2E5 text-gray-900 text-sm block w-full p-2.5"
                />
                <div className="text-sm text-red-400">
                  {errors.accountNumber}
                </div>
              </div>
            </div>
            <div className="grid px-0 pb-3">
              <label
                htmlFor="description"
                className="block mb-2 text-sm text-434852"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="bg-white border border-DFE2E5 text-gray-900 text-sm block w-full p-2.5"
              ></textarea>
            </div>
            <div className="flex flex-row w-full px-0">
              <div className="mb-3 pe-3 mr-2 w-full">
                <label
                  htmlFor="currency"
                  className="block text-sm text-434852 mb-1 mt-2 ml-1"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="form-select bg-white border border-DFE2E5 text-gray-900 text-sm block px-2.5 w-full"
                >
                  <option value="">USD ($)</option>
                </select>
              </div>
              <div className="mb-3 pe-3 mr-2">
                <label
                  htmlFor="balanceDate"
                  className="block text-sm text-434852 mb-1 mt-2 ml-1"
                >
                  Balance as on Date
                </label>
                <input
                  type="date"
                  id="balanceDate"
                  name="balanceDate"
                  className="bg-white border border-DFE2E5 text-gray-900 text-sm block p-2.5"
                />
              </div>
              <div className="mb-3 pe-3">
                <label
                  htmlFor="amount"
                  className="block text-sm text-434852 mb-1 mt-2 ml-1"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="bg-white border border-DFE2E5 text-gray-900 text-sm block p-2.5"
                />
              </div>
            </div>
            <div className="flex justify-end py-4 modal-footer text-md">
              <button
                onClick={onClose}
                type="button"
                className="w-28 text-535252 bg-F4F4F4 hover:bg-eeeeee cancel-btn focus:ring-4 focus:ring-blue-300 font-medium px-5 py-2.5 text-center"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-28 text-white bg-1D4469 hover:bg-20486F save-btn font-medium text-gray-900 border border-gray-200 py-2.5 px-5 ms-3"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
