import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_EMP_TYPE, CREATE_JOB, CREATE_JOB_POSITION } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
//import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "react-datepicker";
//import useCompany from "../../hooks/useCompany";

const CreateEmpType = () => {
  const user = useRequireAuth();
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [companies, setCompanies] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null);

  //const [fieldValue, setFieldValue] = useState(null);

  //const company = useCompany();

  const initialValues = {
    emptype_hindi: "",
    emptype_marathi: "",
    name_marathi: "",
    emptype_punjabi: "",
  };

  const validationSchema = Yup.object().shape({
    
    name: Yup.string().required("default name  is required"),
 
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData(); 
      
      formDataWithFile.append("name", values.name);
      formDataWithFile.append("emptype_hindi", values.emptype_hindi);
      formDataWithFile.append("emptype_marathi", values.emptype_marathi);
      formDataWithFile.append("emptype_punjabi", values.emptype_punjabi);  

      const response = await fetch(CREATE_EMP_TYPE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

       // const data = await response.json();
         

        
    //  dispatch(setProfile(data.data));

      //const companyId = data.data.id;

      // const companyData = {
      //   company_id: companyId,
      //   company_name: data.data.company_name,
      //   message: "Records Sucessfully created!",
      // };
      // localStorage.removeItem("company_data");
      // localStorage.setItem("company_data", JSON.stringify(companyData));
      //  const encryptedCompanyId = Base64.encode(companyId);
      //navigate(`/edit_vender/${encryptedCompanyId}`);
      navigate(`/employment_type/`);
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
                Create Employment Type
              </h5>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id="companyProfileForm" encType="multipart/form-data">
                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Employment Type
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="name">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Employment Type English
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="emptype_hindi">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="emptype_hindi"
                              className="block mb-2 text-535252 text-16  font-400"
                            >
                              Employment type Hindi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />

                            <ErrorMessage
                              name="emptype_hindi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="emptype_marathi">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="emptype"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Employment Type Marathi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter marathi emptype ..."
                            />

                            <ErrorMessage
                              name="emptype_marathi"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <ErrorMessage
                              name="emptype_marathi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="emptype_punjabi">
                        {({ field }) => (
                          <div>
                            <div className="mb-2">
                              <label
                                htmlFor="emptype_punjabi"
                                className="mb-1 text-535252 text-16 font-400"
                              >
                                Employment Type Punjabi
                              </label>
                            </div>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter total_vacancies..."
                            />
                            <ErrorMessage
                              name="emptype_punjabi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </section>

                <div className="flex px-10 font-poppins pt-3 justify-between">
                  <div></div>
                  <div className="flex gap-4">
                    <Link to="/employment_type">
                      <button
                        type="button"
                        className="px-6 py-2 text-base rounded font-normal bg-F4F4F4 focus:outline-none"
                      >
                        CANCEL
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-2 text-base rounded font-normal bg-1D4469 text-white focus:outline-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "SAVING..." : "SAVE"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/*
      <CompanyProfile />
      <AddAddress />
      <AddContact /> */}

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
  );
};

//export default LayoutHOC(AddCompany);

export default LayoutHOC(CreateEmpType);
