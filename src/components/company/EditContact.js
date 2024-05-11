import React, { useState, useEffect } from "react";
import useRequireAuth from "../../utils/useRequireAuth";
import { useSelector } from "react-redux";
import { DELETE_CONTACT_API, SAVE_CONTACT } from "../../utils/constants";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useEdiContact from "../../utils/company/useEdiContact";
import Shimmer from "../Shimmer";


const EditContact = () => {
  const user = useRequireAuth();
  const companyLocalData = localStorage.getItem("company_data");
  const parsedCompanyData = JSON.parse(companyLocalData);
  const company_profile_id = parsedCompanyData.company_id;

  let data = useEdiContact(company_profile_id);

  //console.log(data);

  const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
};


  const [contSubmitted, setConSubmitted] = useState(false);
  const [conSuccessMessage, setContSuccessMessage] = useState("");
  const [contErrorMessage, setConErrorMessage] = useState("");

  const [apiContacts, setApiContacts] = useState([]); 
 

const [contacts, setContacts] = useState([
    {
      id: "",
      name: "",
      designation: "",
      contactNo: "",
      email: "",
      isRemovable: false,
    },
  ]);


  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: "",
      designation: "",
      contactNo: "",
      email: "",
      isRemovable: true,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleRemoveContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };



  const handleHardRemoveContact = async (id) => {
    try {
        const Authtoken = user.token;
        const response = await fetch(`${DELETE_CONTACT_API}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Authtoken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete contact");
        } 

        setConErrorMessage('Contact deleted successfully');
        setTimeout(() => {
            setConErrorMessage("");
          }, 5000);

        setApiContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );

    } catch (error) {
        console.error("Error deleting contact:", error.message);
    }
};
 
    useEffect(() => {
      if (data) {
        setApiContacts(data);
      }
    }, [data]);
    

const handleAddMoreInputChanged = (e, id) => { 
    const { name, value } = e.target;
  // console.log(name, value,id );

    // setContacts((prevContacts) =>
    //   prevContacts.map((contact) =>
    //     contact.id === id ? { ...contact, [name]: value } : contact
    //   )
    // );

    setApiContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, [name]: value } : contact
      )
    );
 

  };

 //console.log(apiContacts);


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const Authtoken = user.token;
      const response = await fetch(SAVE_CONTACT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_profile_id: company_profile_id,
          contacts: values,
        }),
      });

      const data = await response.json();

      setContSuccessMessage(data.message);
      setConSubmitted(false);

      setTimeout(() => {
        setContSuccessMessage("");
      }, 5000);
    } catch (error) {
      setConSubmitted(false);
      setContSuccessMessage("");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setContSuccessMessage(error.response.data.message);
      } else {
        setContSuccessMessage("An error occurred while submitting the form.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="Contact-Person bg-white mt-5 pt-5  py-8">
      <Formik
         initialValues={{
            contacts: apiContacts.map((contact) => ({
              id: contact.id,
              name: contact.name,
              designation: contact.designation,
              contactNo: contact.contact_no,
              email: contact.email_address,
            })),
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            contacts: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().required("Required"),
                designation: Yup.string().required("Required"),
                contactNo: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
              })
            ),
          })}
      >
        {(formik) => (
          <Form>
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
                {apiContacts &&
                        apiContacts.map((contact, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4">
                        <Field
                            type="text"
                            onChange={(e) => handleAddMoreInputChanged(e, index)}
                            name={`contacts[${contact.name}]`}
                            defaultValue={contact.name}
                            className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                            placeholder="Name"
                            />
                            <ErrorMessage
                            name={`contacts[${index}].name`}
                            component="div"
                            className="text-red-500 text-xs italic"
                            />
                      </td>

                        <td className="px-6 py-4">
                          <Field
                            type="text"
                            name={`contacts[${contact.designation}]`}
                            defaultValue={contact.designation}
                            className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                            placeholder="Designation"
                          />
                          <ErrorMessage
                            name={`contacts[${contact.designation}]`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <Field
                            type="text"
                            name={`contacts[${contact.contact_no}]`}
                            defaultValue={contact.contact_no}
                            className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                            placeholder="Contact Number"
                          />
                          <ErrorMessage
                            name={`contacts[${contact.contact_no}`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <Field
                            type="text"
                            name={`contacts[${contact.email_address}]`}
                            defaultValue={contact.email_address}
                            className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                            placeholder="Email Address"
                          />
                          <ErrorMessage
                            name={`contacts[${contact.email_address}]`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </td>

                        <td><button  onClick={() => handleHardRemoveContact(contact.id)} type="button" class="text-red-500 font-semibold" fdprocessedid="nv0vc"><div class="ml-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F84545" class="w-6 h-6 border-b9663 "><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z "></path></svg></div></button></td>

                      </tr>
                    ))}

                  {!apiContacts && <Shimmer width="100%" height="100px" />}

                  {contacts.map((contact, index) => (
                    <tr key={index} className="bg-white ">
                      <td className="px-6 py-4">
                        <Field
                          type="text"
                          name={`contacts[${index}].name`}
                          className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                          placeholder="name"
                        />
                        <ErrorMessage
                          name={`contacts[${index}].name`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <Field
                          type="text"
                          name={`contacts[${index}].designation`}
                          className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                          placeholder="designation"
                        />
                        <ErrorMessage
                          name={`contacts[${index}].designation`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <Field
                          type="text"
                          name={`contacts[${index}].contactNo`}
                          className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                          placeholder="Contact Number"
                        />
                        <ErrorMessage
                          name={`contacts[${index}].contactNo`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <Field
                          type="text"
                          name={`contacts[${index}].email`}
                          className=" border border-gray-300 text-gray-900 text-sm  block w-full p-2.5 "
                          placeholder="Email Address"
                        />
                        <ErrorMessage
                          name={`contacts[${index}].email`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </td>

                      <td>
                        {contact.isRemovable && (
                          <button
                            type="button"
                            onClick={() => handleRemoveContact(contact.id)}
                            className="text-red-500 font-semibold"
                            disabled={contSubmitted}
                          >
                            <div className="ml-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#F84545"
                                className="w-6 h-6 border-b9663 "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z "
                                />
                              </svg>
                            </div>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex px-10 font-poppins pt-5 justify-between"> 
            
              <button type="button" onClick={handleAddContact}>
                <div className="text-center text-red-500 text-lg font-medium font-poppins">
                  + Add Contact
                </div>
              </button>
              <div className="flex gap-4">
              <div className="text-center"> 
                 <span className="p p-1 text-red-500">{contErrorMessage}</span> 
                <span className="p p-1 text-green-400">{conSuccessMessage}</span> 
              </div>
                            

                <button
                  type="button"
                  className="px-6 py-2 text-base rounded font-normal bg-F4F4F4  focus:outline-none"
                  onClick={() => formik.resetForm()}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "SAVE"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditContact;
