import React, { useState, useEffect } from "react";
import useRequireAuth from "../../utils/useRequireAuth";
import { useSelector } from 'react-redux';
import { SAVE_ADDRESS } from '../../utils/constants';
import useEditAddress from "../../utils/company/useEditAddress";

const EditAddress = () => {

    const user = useRequireAuth();
    // const profile = useSelector(store => store.profile);    
    // const company_profile_id =  profile.addProfile ? profile.addProfile.id : null;  

    const companyLocalData = localStorage.getItem("company_data");
    const parsedCompanyData = JSON.parse(companyLocalData);
    const company_profile_id = parsedCompanyData.company_id;

    const data = useEditAddress(company_profile_id);

    //console.log(data?.data);

    const [addSubmitted, setAddSubmitted] = useState(false);
    const [addSuccessMessage, setAddSuccessMessage] = useState('');  
    const [addErrorMessage, setAddErrorMessage] = useState('');

    const generateUniqueId = () => {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    };

    const [addresses, setAddresses] = useState([
        { id: generateUniqueId(), addressType: "", point_of_contact: "", designation: "", state: "", city: "", zip_code: "", address: "", phone1: "", phone2: "", primary_email: "", secondary_email: "", isRemovable: false },
    ]); 

    const handleAddAddress = () => {
        const newAddress = {
            id: generateUniqueId(),
            addressType: "",
            point_of_contact: "",
            designation: "",            
            state: "",
            city: "",
            zip_code: "",
            address: "",
            phone1: "",
            phone2: "",
            primary_email: "",
            secondary_email: "",
            isRemovable: true
        };
        setAddresses(prevAddresses => [...prevAddresses, newAddress]);
    };
    
    const handleSelectChange = (id, field, value) => {
        console.log(id+', '+field+', '+value);
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>                
                address.id === id ? { ...address, [field]: value } : address                
            )
        );
        
    };


    const handleAddressSubmit = async (e) => {         
        e.preventDefault(); 
        const filteredAddress = addresses.filter(address =>
            address.addressType.trim() !== '' &&  address.point_of_contact.trim() !== '' && address.designation.trim() !== ''
        ); 
         
        try {
            const Authtoken = user.token;
            const formDataWithFile = new FormData();   
            const formattedAddress = filteredAddress.map(address => ({
                addressType: address.addressType,
                point_of_contact: address.point_of_contact,
                designation: address.designation,
                country: address.country_id,
                city: address.city,
                state: address.state,
                zip_code: address.zip_code,
                address: address.address, 
                phone1: address.phone1,
                phone2: address.phone2,
                primary_email: address.primary_email,
                secondary_email: address.secondary_email 
            }));

            const response = await fetch(SAVE_ADDRESS, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Authtoken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    company_profile_id: company_profile_id,
                    addresses: formattedAddress 
                })
            });

            const data = await response.json();             
            setAddSuccessMessage(data.message);
            setAddSubmitted(false);

            setTimeout(() => {
                setAddSuccessMessage('');
            }, 10000);
            
        } catch (error) {
            setAddSubmitted(false);
            setAddSuccessMessage('');
            if (error.response && error.response.data && error.response.data.message) {
                setAddSuccessMessage(error.response.data.message);
            } else {
                setAddSuccessMessage('An error occurred while submitting the form.');
            }
        } 
    }; 

    return (
        <div>
            <section className="address bg-white mt-5 pt-5 py-8">
            <div className="flex items-center justify-between">
            <div className="text-slate-500 text-2xl font-normal font-['Be Vietnam'] capitalize pl-10 py-3">
                Address
            </div>
            <div className="pr-10 rounded-lg">
                <select name="test" className="text-sm block w-full px-2.5 py-0.5 rounded-2xl">
                    <option value="default">Default</option>
                    <option value="primary">Primary</option>
                    <option value="legal address">Legal Address</option> 
                </select>
            </div>
            </div>

                {data?.data.map((loop) => {
                    //console.log(loop.point_of_contact);
                     
                    return (
                        <div key={loop.id} className="font-poppins grid grid-cols-3 px-10 py-3 pt-5 gap-6 my-2 border-t border-gray-300">
                           <div>
                       <label htmlFor={`loopType[${loop.id}]`} className="block mb-1  text-535252 text-16  font-400">
                           Address Type
                       </label>
                       <select
                           id={`addressType[${loop.id}]`}
                           name={`addressType[${loop.id}]`}
                           defaultValue={loop.address_type}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "addressType", e.target.value)
                           }
                           className="text-sm block w-full px-2.5 py-0.5" disabled={addSubmitted}
                       >
                           <option value="">Select Address Type</option>
                           <option value="Address 1">Address 1</option>
                           <option value="Address 2">Address 2</option>
                           <option value="Address 3">Address 3</option>
                           <option value="Address 4">Address 4</option>
                           <option value="Address 5">Address 5</option>
                       </select>
                   </div>

                   <div>
                       <label htmlFor={`point_of_contact[${loop.id}]`} className="block mb-1  text-535252 text-16  font-400">
                           Point of Contact
                       </label>
                       <input
                           type="text"
                           name={`point_of_contact[${loop.id}]`}
                           defaultValue={loop.point_of_contact}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "point_of_contact", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="Point of Contact" disabled={addSubmitted}
                       />
                   </div> 
                   <div>
                       <label htmlFor="designation" className="block mb-1  text-535252 text-16  font-400">
                          Designation
                       </label>
                       <input
                           type="text"
                           name={`designation[${loop.id}]`}
                           defaultValue={loop.designation}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "designation", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="Designation" disabled={addSubmitted}
                       />
                   </div>

                   <div>
                       <label htmlFor={`country_id[${loop.id}]`} className="block mb-1  text-535252 text-16  font-400">
                           Country
                       </label>

                       <select
                           id={`country_id[${loop.id}]`}
                           name={`country_id[${loop.id}]`}
                           defaultValue={loop.country_id}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "country_id", e.target.value)
                           }
                           className="text-sm block w-full px-2.5 py-0.5" disabled={addSubmitted}
                       >
                       <option value="">Select Country</option>
                       <option value="1">United States of America (USA)</option>
                       <option value="2">India</option>
                       <option value="3">Canada</option>
                       <option value="4">Australia</option>
                       <option value="5">United Kingdom</option>
                          
                       </select> 
                      
                       
                   </div>

                   <div>
                       <label htmlFor="State" className="block mb-1  text-535252 text-16  font-400">
                           State
                       </label>
                       <input
                           type="text"
                           name={`state[${loop.id}]`}
                           defaultValue={loop.state}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "state", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="State" disabled={addSubmitted}
                       />
                   </div> 

                   <div>
                       <label htmlFor="designation" className="block mb-1  text-535252 text-16  font-400">
                          City
                       </label>
                       <input
                           type="text"
                           name={`city[${loop.id}]`}
                           defaultValue={loop.city}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "city", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="City" disabled={addSubmitted}
                       />
                   </div>


                   <div>
                       <label htmlFor={`zip_code[${loop.id}]`} className="block mb-1  text-535252 text-16  font-400">
                           Zip Code
                       </label> 

                       <input
                           type="text"
                           name={`zip_code[${loop.id}]`}
                           defaultValue={loop.zip_code}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "zip_code", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="zip_code" disabled={addSubmitted}
                       />                     
                       
                   </div>

                   <div>
                       <label htmlFor="address" className="block mb-1  text-535252 text-16  font-400">
                           Address
                       </label>
                       <input
                           type="text"
                           name={`address[${loop.id}]`}
                           defaultValue={loop.address}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "address", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="Address" disabled={addSubmitted}
                       />
                   </div> 

                   <div>
                       <label htmlFor="phone no1" className="block mb-1  text-535252 text-16  font-400">
                          Phone 1
                       </label>
                        

                   <input
                           type="text"
                           name={`phone1[${loop.id}]`}
                           defaultValue={loop.phone1}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "phone1", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="phone1" disabled={addSubmitted}
                       />

                   </div>

                   <div>
                       <label htmlFor={`phone2[${loop.id}]`} className="block mb-1  text-535252 text-16  font-400">
                          Phone 2
                       </label>

                      <input
                           type="text"
                           name={`phone2[${loop.id}]`}
                           defaultValue={loop.phone2}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "phone2", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="phone2" disabled={addSubmitted}
                       />



                   </div>

                   <div>
                       <label htmlFor="Primary Email" className="block mb-1  text-535252 text-16  font-400">
                       Primary Email
                       </label>
                       <input
                           type="text"
                           name={`primary_email[${loop.id}]`}
                           defaultValue={loop.primary_email}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "primary_email", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="Primary Email" disabled={addSubmitted}
                       />
                   </div> 

                   <div>
                   <label htmlFor="Secondary Email" className="block mb-1  text-535252 text-16  font-400">
                   Secondary Email
                       </label>
                       <input
                           type="text"
                           name={`secondary_email[${loop.id}]`}
                           defaultValue={loop.secondry_email}
                           onChange={(e) =>
                               handleSelectChange(loop.id, "secondary_email", e.target.value)
                           }
                           className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                           placeholder="Secondary Email" disabled={addSubmitted}
                       />
                   </div>   
                </div>
                    );
                })} 


                {addresses.map((address) => (
                    <div key={address.id} className="font-poppins grid grid-cols-3 px-10 py-3 pt-5 gap-6 my-2 border-t border-gray-300">
                        <div>
                            <label htmlFor={`addressType[${address.id}]`} className="block mb-1  text-535252 text-16  font-400">
                                Address Type
                            </label>
                            <select
                                id={`addressType[${address.id}]`}
                                name={`addressType[${address.id}]`}
                                defaultValue={address.addressType}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "addressType", e.target.value)
                                }
                                className="text-sm block w-full px-2.5 py-0.5" disabled={addSubmitted}
                            >
                                <option value="">Select Address Type</option>
                                <option value="Address 1">Address 1</option>
                                <option value="Address 2">Address 2</option>
                                <option value="Address 3">Address 3</option>
                                <option value="Address 4">Address 4</option>
                                <option value="Address 5">Address 5</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor={`point_of_contact[${address.id}]`} className="block mb-1  text-535252 text-16  font-400">
                                Point of Contact
                            </label>
                            <input
                                type="text"
                                name={`point_of_contact[${address.id}]`}
                                defaultValue={address.point_of_contact}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "point_of_contact", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="Point of Contact" disabled={addSubmitted}
                            />
                        </div> 


                        

                        <div>
                            <label htmlFor="designation" className="block mb-1  text-535252 text-16  font-400">
                               Designation
                            </label>
                            <input
                                type="text"
                                name={`designation[${address.id}]`}
                                defaultValue={address.designation}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "designation", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="Designation" disabled={addSubmitted}
                            />
                        </div>
 


                        <div>
                            <label htmlFor={`country_id[${address.id}]`} className="block mb-1  text-535252 text-16  font-400">
                                Country
                            </label>

                            <select
                                id={`country_id[${address.id}]`}
                                name={`country_id[${address.id}]`}
                                defaultValue={address.country_id}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "country_id", e.target.value)
                                }
                                className="text-sm block w-full px-2.5 py-0.5" disabled={addSubmitted}
                            >
                            <option value="">Select Country</option>
                            <option value="1">United States of America (USA)</option>
                            <option value="2">India</option>
                            <option value="3">Canada</option>
                            <option value="4">Australia</option>
                            <option value="5">United Kingdom</option>
                               
                            </select> 
                           
                            
                        </div>

                        <div>
                            <label htmlFor="point_of_contact" className="block mb-1  text-535252 text-16  font-400">
                                State
                            </label>
                            <input
                                type="text"
                                name={`state[${address.id}]`}
                                defaultValue={address.state}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "state", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="State" disabled={addSubmitted}
                            />
                        </div> 

                        <div>
                            <label htmlFor="designation" className="block mb-1  text-535252 text-16  font-400">
                               City
                            </label>
                            <input
                                type="text"
                                name={`city[${address.id}]`}
                                value={address.city}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "city", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="City" disabled={addSubmitted}
                            />
                        </div>


                        <div>
                            <label htmlFor={`zip_code[${address.id}]`} className="block mb-1  text-535252 text-16  font-400">
                                Zip Code
                            </label> 

                            <input
                                type="text"
                                name={`zip_code[${address.id}]`}
                                defaultValue={address.zip_code}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "zip_code", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="zip_code" disabled={addSubmitted}
                            /> 
                            
                        </div>

                        <div>
                            <label htmlFor="address" className="block mb-1  text-535252 text-16  font-400">
                                Address
                            </label>
                            <input
                                type="text"
                                name={`address[${address.id}]`}
                                defaultValue={address.address}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "address", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="Address" disabled={addSubmitted}
                            />
                        </div> 

                        <div>
                            <label htmlFor="phone no1" className="block mb-1  text-535252 text-16  font-400">
                               Phone 1
                            </label>
                             

                        <input
                                type="text"
                                name={`phone1[${address.id}]`}
                                defaultValue={address.phone1}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "phone1", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="phone1" disabled={addSubmitted}
                            />

                        </div>

                        <div>
                            <label htmlFor={`phone2[${address.id}]`} className="block mb-1  text-535252 text-16  font-400">
                               Phone 2
                            </label>
 
                           <input
                                type="text"
                                name={`phone2[${address.id}]`}
                                defaultValue={address.phone2}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "phone2", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="phone2" disabled={addSubmitted}
                            /> 

                        </div>

                        <div>
                            <label htmlFor="Primary Email" className="block mb-1  text-535252 text-16  font-400">
                            Primary Email
                            </label>
                            <input
                                type="text"
                                name={`primary_email[${address.id}]`}
                                defaultValue={address.primary_email}
                                onChange={(e) =>
                                    handleSelectChange(address.id, "primary_email", e.target.value)
                                }
                                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                                placeholder="Primary Email" disabled={addSubmitted}
                            />
                        </div> 

                        <div>
    <label htmlFor="Secondary Email" className="block mb-1 text-535252 text-16 font-400">
        Secondary Email
    </label>
    <input
        type="text"
        name={`secondary_email[${address.id}]`}
        defaultValue={address.secondary_email}
        onChange={(e) =>
            handleSelectChange(address.id, "secondary_email", e.target.value)
        }
        className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
        placeholder="Secondary Email" disabled={addSubmitted}
    />

     
     
</div>

                        
                       


                        
                    </div>
                ))}
                <div className="flex px-10 font-poppins pt-5 justify-between">
                    <div>
                        <button onClick={handleAddAddress} disabled={addSubmitted}>
                            <div className="text-center text-red-500 text-lg font-medium font-poppins">
                                + Add Address
                            </div>
                        </button>
                    </div>
                    <div className="flex gap-4"> 

                        <div className="text-center">                
                            <span className="p p-1 text-green-400">{addSuccessMessage}</span> 
                        </div> 

                        <button className="px-6 py-2 text-base rounded font-normal bg-F4F4F4  focus:outline-none">
                            CANCEL
                        </button>
                        <button type="submit" onClick={handleAddressSubmit} className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none">
                            SAVE
                        </button>
                    </div>
                </div>

               
     

            </section>
        </div>
    );
}

export default EditAddress;
