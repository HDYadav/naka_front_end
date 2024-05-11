import React, { useState, useEffect } from "react";
import useRequireAuth from "../../utils/useRequireAuth";
import { useSelector } from 'react-redux';
import { SAVE_CONTACT } from '../../utils/constants';

function AddContact() {

    const user = useRequireAuth();
    const profile = useSelector(store => store.profile);    
    const company_profile_id =  profile.addProfile ? profile.addProfile.id : null; 

    const [contSubmitted, setConSubmitted] = useState(false);
    const [conSuccessMessage, setContSuccessMessage] = useState('');  
    const [contErrorMessage, setConErrorMessage] = useState('');

    const [contacts, setContacts] = useState([
        { id: 1, name: "", designation: "", contactNo: "", email: "", isRemovable: false },
    ]);

    const handleAddContact = () => {
        const newContact = {
            id: contacts.length + 1,
            name: "",
            designation: "",
            contactNo: "",
            email: "",
            isRemovable: true
        };
        setContacts(prevContacts => [...prevContacts, newContact]);
       // setConSubmitted(false);
    };

    const handleRemoveContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    };

    const handleInputChange = (id, field, value) => {
        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact.id === id ? { ...contact, [field]: value } : contact
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const filteredContacts = contacts.filter(contact =>
            contact.name.trim() !== '' && contact.designation.trim() !== '' && contact.contactNo.trim() !== '' && contact.email.trim() !== ''
        );

        try {
            const Authtoken = user.token;

            const formattedContacts = filteredContacts.map(contact => ({
                contact_name: contact.name,
                designation: contact.designation,
                contact_no: contact.contactNo,
                email_address: contact.email
            }));

            const response = await fetch(SAVE_CONTACT, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Authtoken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    company_profile_id: company_profile_id,
                    contacts: formattedContacts 
                })
            });

            const data = await response.json();             
            setContSuccessMessage(data.message);
            setConSubmitted(true);

            setTimeout(() => {
                setContSuccessMessage('');
            }, 10000);
            
            
        } catch (error) {
            setConSubmitted(false);
            setContSuccessMessage('');
            if (error.response && error.response.data && error.response.data.message) {
                setContSuccessMessage(error.response.data.message);
            } else {
                setContSuccessMessage('An error occurred while submitting the form.');
            }
        } 
    };

    return (
        <div>
            <section className="Contact-Person bg-white mt-5 pt-5  py-8">
                <form onSubmit={(e) => e.preventDefault()}  id="#" encType="multipart/form-data">
                    <div className="text-slate-500 text-2xl font-normal font-['Be Vietnam']capitalize pl-10 py-3">
                        Contact Person
                    </div>
                    <div className="relative  px-4 py-3 pt-1">
                        <table className="w-full  text-left rtl:text-right  font-poppins  text-neutral-600 text-lg font-normal">
                            <thead className="text-neutral-600  font-normal ">
                                <tr className="bg-white ">
                                    <th
                                        scope="col"
                                        className="px-6 py-4 pb-0 mb-0  text-535252 text-16  font-400 "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 pb-0 mb-0  text-535252 text-16  font-400"
                                    >
                                        Designation
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 pb-0 mb-0 text-535252 text-16  font-400"
                                    >
                                        Contact No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 pb-0 mb-0  text-535252 text-16  font-400"
                                    >
                                        Email Address*
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-2 pb-0 mb-0  text-535252 text-16  font-400"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="bg-white ">
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name={`contact_name[${contact.id}]`}
                                                value={contact.name}
                                                onChange={(e) =>
                                                    handleInputChange(contact.id, "name", e.target.value)
                                                }
                                                className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                                                placeholder="name" 
                                                disabled={contSubmitted}
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name={`designation[${contact.id}]`}
                                                value={contact.designation}
                                                onChange={(e) =>
                                                    handleInputChange(contact.id, "designation", e.target.value)
                                                }
                                                className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                                                placeholder="designation" 
                                                disabled={contSubmitted}
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name={`contactNo[${contact.id}]`}
                                                value={contact.contactNo}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        contact.id,
                                                        "contactNo",
                                                        e.target.value
                                                    )
                                                }
                                                className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                                                placeholder="Contact Number"
                                                disabled={contSubmitted}
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name={`email[${contact.id}]`}
                                                value={contact.email}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        contact.id,
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                                                placeholder="Email Address"
                                                disabled={contSubmitted}
                                            />
                                        </td>

                                        <td>
                                            <div className="ml-6">
                                            {contact.isRemovable && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveContact(contact.id)}
                                                    className="text-red-500 font-semibold"
                                                    disabled={contSubmitted}
                                                >
                                                <div className="ml-6">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F84545" className="w-6 h-6 border-b9663 "
                                                >
                                                    <path  strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z " />
                                                </svg>
                                                </div>
                                                </button>
                                            )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex px-10 font-poppins pt-5 justify-between">
                        <div>
                            <button onClick={handleAddContact} disabled={true}>
                            <div className="text-center text-red-500 text-lg font-medium font-poppins">
                                + Add Contact
                            </div>
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="px-6 py-2 text-base rounded font-normal bg-F4F4F4  focus:outline-none"
                                disabled={true}
                            >
                            CANCEL
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit} 
                                className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none pointer-events-none opacity-50"
                                disabled={true}
                            >
                            SAVE
                            </button>
                        </div>
                    </div>
                </form>

                {contSubmitted && (
                    <div className='p-10 text-green-400'>{conSuccessMessage}</div>
                )}

                {contErrorMessage && (
                <div className='p-10 text-red-400'>{contErrorMessage}</div> )} 


            </section>
        </div>
    );
}

export default AddContact;
