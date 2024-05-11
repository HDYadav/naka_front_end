import React, { useState, useEffect,Fragment } from "react"; 

import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";

const AddCustomer = () =>{

    const [activeOption, setActiveOption] = useState('');

    const handleClick = (option) => {
        setActiveOption(option);
    };


    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

         return (
            <main id="maincontent">
                    <div className={`p-4 mt-14`}>
                   
                        <div className={`flex flex-col bg-white p-2`}>
                            <div className={`flex justify-between items-center px-6`}>
                                <h5 className={`text-203C50 font-Vietnam text-[28px] font-medium`}>New Customer</h5>
                                <div className={`flex items-center`}>


                                    
                                        <label className={`inline-flex items-center cursor-pointer`}>
                                              <input type={`checkbox`} className={`sr-only peer`} />
                                               <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
                                        </label>


                                </div>
                            </div>
                        </div> 


                        <div className={`rounded-md bg-white mt-4 p-4`}>
                            
                        <form>
                            <div className={`flex gap-5 px-5 mb-3`}>
                                <div className={`gap-4 gap-x-10 grid grid-cols-2`}>
                                    <div>
                                    <label
                                        htmlFor={`customer_name`}
                                        className={`block mb-2 text-535252 text-md font-small`}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type={`text`}
                                        id={`customer_name`}
                                        className={`w-360px border-BFBFBF text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        placeholder={`Enter Name  . . . `}
                                    />
                                    </div>
                                    <div>
                                    <label
                                        htmlFor={`Website`}
                                        className={`block mb-2 text-535252 text-md font-small`}
                                    >
                                        Cust. Display Name*
                                    </label>
                                    <input
                                        type={`text`}
                                        id={`Website`}
                                        className={`w-360px border border-gray-300 text-gray-900 text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                      
                                    />
                                    </div>
                                    <div>
                                    <label
                                        htmlFor={`website`}
                                        className={`block mb-2 text-535252 text-md font-small`}
                                    >
                                        Website
                                    </label>
                                    <input
                                        type={`url`}
                                        id={`website`}
                                        className={`w-360px border border-gray-300 text-gray-900 text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        placeholder={``}
                                        required={``}
                                    />
                                    </div>
                                    <div>
                                    <label htmlFor={`types`} className={`mb-1 text-1D4469 text-sm font-normal`}>
                                        Type
                                    </label>
                                    <div id={`types`} className={`py-1.5`}>
                                        <button
                                        type={`button`}
                                        className={`me-2 px-4 py-2 h-[35px] text-sm font-normal  border  bg-white focus:outline-none  option ${activeOption === 'business' ? 'border-2C495D text-2C495D' : 'border-BDBDBD text-A3A3A3'}`}
                                        data-option={`business`}
                                        onClick={() => handleClick('business')}
                                        >
                                        Business
                                        </button>
                                        <button
                                        type={`button`}
                                        className={`me-2 px-4 py-2 h-[35px] text-sm font-normal  border bg-white focus:outline-none  option  ${activeOption === 'individual' ? 'border-2C495D text-2C495D' : 'border-BDBDBD text-A3A3A3'}`}
                                        data-option={`individual`}
                                        onClick={() => handleClick('individual')}
                                        >
                                        Individual
                                        </button>
                                        <button
                                        type={`button`}
                                        className={`me-2 px-4 py-2 h-[35px] text-sm font-normal  border bg-white focus:outline-none  option ${activeOption === 'prospect' ? 'border-2C495D text-2C495D' : 'border-BDBDBD text-A3A3A3'}`}
                                        data-option={`prospect`}
                                        onClick={() => handleClick('prospect')}
                                        >
                                        Prospect
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                {/* <div className={`flex flex-1 justify-end`}>
                                    <div className={`w-48`}>

                                    <div className={`border-dashed border-2 border-BFBFBF h-full`}>
                                        <div
                                        id={`image-preview`}
                                        className={`max-w-sm p-6 rounded-lg items-center mx-auto text-center cursor-pointer h-full flex items-center justify-center`}
                                        >
                                        <input
                                            id={`upload`}
                                            name={`customerfile`}
                                            type={`file`}
                                            className={`hidden`}
                                            accept={`image/*`}
                                        />
                                        <label htmlFor={`upload`} className={`cursor-pointer`}>
                                            <i className={`bi bi-upload text-2xl`} />
                                            <p className={`text-lg text-gray-500`}>Add Logo</p>
                                            <span id={`filename`} className={`text-gray-500 bg-gray-200 z-50`} />
                                        </label>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}


<div className="flex flex-1 justify-end">
      <div className="w-48">
        <div className="border-dashed border-2 border-BFBFBF h-full">
          <div id="image-preview" className="max-w-sm rounded-lg flex items-center justify-center text-center cursor-pointer h-full ">
            <input
              id="upload"
              name="customerfile"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="upload" className="cursor-pointer">
             
              {selectedFile ? 
                      
                    <Fragment>
                    <div className="relative">
                           <img src={selectedFile} alt="img preview" className="object-cover" />      
                            <span className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
                                <span className="relative"> 
                                    <i className="bi bi-circle-fill text-1E1E1E text-4xl"></i> 
                                    <i className="bi bi-upload text-2xl text-white absolute top-0 left-0 right-0 bottom-0" />
                                </span>

                            </span>

                    </div>
                    </Fragment>
                     
                     :  
                    <Fragment>
                       <i className="bi bi-upload text-2xl" />
                       <p className="text-lg text-gray-500">Add Logo</p>
                    </Fragment>
              }


              <span id="filename" className="text-gray-500 bg-gray-200 z-50" />
            </label>
          </div>
        </div>
      </div>
    </div>


                            </div>


                            <div className={`gap-10 flex px-5 mb-3`}>
                                    <div>
                                        <label
                                        htmlFor={`businesscategory`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Business Category
                                        </label>
                                        <select
                                        id={`businesscategory`}
                                        className={`form-select w-360px border border-BFBFBF text-383838 text-md  focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 `}
                                        >
                                        <option >Insurance</option>
                                        <option >Utility</option>
                                        <option >Food</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                        htmlFor={`taxno`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Tax Number
                                        </label>
                                        <input
                                        type={`text`}
                                        id={`taxno`}
                                        className={`w-360px border-BFBFBF text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                        htmlFor={`country`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Country
                                        </label>
                                        <input
                                        type={`text`}
                                        id={`country`}
                                        className={`w-360px border border-gray-300 text-gray-900 text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        />
                                    </div>
                            </div>


                            <div className={`gap-10 flex px-5 mb-4`}>
                                    <div>
                                        <label
                                        htmlFor={`companyname`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Company Name
                                        </label>
                                        <input
                                        type={`text`}
                                        id={`companyname`}
                                        className={`w-360px border-BFBFBF text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                        htmlFor={`taxno`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Phone
                                        </label>
                                        <input
                                        type={`text`}
                                        id={`taxno`}
                                        className={`w-360px border-BFBFBF text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                        htmlFor={`country`}
                                        className={`block mb-2 text-535252 text-lg font-small`}
                                        >
                                        Email
                                        </label>
                                        <input
                                        type={`text`}
                                        id={`country`}
                                        className={`w-360px border border-gray-300 text-gray-900 text-sm  focus:ring-1d4469 focus:border-1d4469 w-full px-2.5`}
                                        />
                                    </div>
                            </div>

                            

                                 <div className={`flex justify-end`}>
                                    
                                            <Link to="/customers" type={`button`} className={`text-535252 bg-F4F4F4 border border-EAE2E2 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2 me-5 mb-2 focus:outline-none`}>CANCEL</Link>
                                            <Link to="/add_customer1" type={`button`} className={`py-2 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-1D4469 focus:z-10 focus:ring-4 focus:ring-gray-100`}>SAVE</Link>
                                           

                                 </div>

                        </form>

                        </div>
                         
                       
                    </div>
            </main>
         );
}

export default LayoutHOC(AddCustomer);