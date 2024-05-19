import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_JOB } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import LayoutHOC from "../LayoutHOC";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CreateJob = () => {
  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  // const [responseData, setResponseData] = useState(null);
  // const [companyDisplayName, setCompanyDisplayName] = useState(null);

  const [formData, setFormData] = useState({
    vendor_name: "",
    display_name: "",
    website: "",
    vednor_pic: null,
  });

  // const [fileName, setFileName] = useState("");
  // const fileInputRef = useRef(null);

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   handleFileUpload(file);
  // };

  // const handleFileUpload = (file) => {
  //   const reader = new FileReader();

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     setFileName(file.name); // Set file name when file is uploaded
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const file = e.target.files[0];
  //   handleFileUpload(file);
  // };

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  
  
  

  const handleRadioButtonClick = (value, setFieldValue) => {
    setFormData({ ...formData, type: value });
    // console.log(value);
    //setFieldValue("type", value);
  };

  const initialValues = {
    job_title: ""
    
  };

  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Job title  is required"),
     
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {    
  

    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();
      formDataWithFile.append("job_title", values.job_title);
     
       

      const response = await fetch(CREATE_JOB, {
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
                Create Job
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
                    Job Details
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="job_title">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="job_title"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Job Title
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />
                            <ErrorMessage
                              name="job_title"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="Select Company *">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="company"
                              className="block mb-2 text-535252 text-16  font-400"
                            >
                              Select Company *
                            </label>

                            <Field
                              as="select"
                              id="company"
                              name="company"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select comp</option>
                              <option value="1">Noida Ltd</option>
                              <option value="2">Pune Ltd</option>
                            </Field>

                            <ErrorMessage
                              name="company"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="Category">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="Category"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Category *
                            </label>

                            <Field
                              as="select"
                              id="category"
                              name="category"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select category</option>
                              <option value="1">Group 1</option>
                              <option value="2">Group 2</option>
                              <option value="3">Group 3</option>
                              <option value="4">Group 4</option>
                              <option value="5">Group 5</option>
                            </Field>

                            <ErrorMessage
                              name="category"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="type">
                        {({ field }) => (
                          <div>
                            <div className="mb-2">
                              <label
                                htmlFor="types"
                                className="mb-1 text-535252 text-16 font-400"
                              >
                                Total Vacancies *
                              </label>
                            </div>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter total_vacancies..."
                            />
                            <ErrorMessage
                              name="total_vacancies"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="deadline">
                        {({ field }) => (
                          <div>
                            <div className="pe-2 flex self-end w-full text-center mb-2">
                              <label
                                htmlFor="deadline *"
                                className="text-535252 text-16 font-400"
                              >
                                Deadline *
                              </label>
                            </div>

                            <DatePicker
                              {...field}
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              placeholderText="Select a date"
                              className="flex items-center p-1 w-full text-center text-gray-500"
                            />

                            {/* <input
                              {...field}
                              className="flex items-center p-1 w-full text-center text-gray-500"
                              type="text"
                              placeholder="Enter deadline..."
                            /> */}
                            <ErrorMessage
                              name="deadline"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </section>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Location
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="country_name">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="country_name"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Country Name
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />
                            <ErrorMessage
                              name="country_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="state">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="state"
                              className="block mb-2 text-535252 text-16  font-400"
                            >
                              Select State *
                            </label>

                            <Field
                              as="select"
                              id="state"
                              name="state"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select state</option>
                              <option value="1">Maharashtra</option>
                              <option value="2">Punjab</option>
                            </Field>

                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="city">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="city"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              City *
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter city..."
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </section>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Salary Details
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="minSalary">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="minSalary"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Minimum Salary
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter minSalary..."
                            />
                            <ErrorMessage
                              name="minSalary"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="maxSalary">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="maxSalary"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Maximum Salary
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter Max Salary..."
                            />
                            <ErrorMessage
                              name="maxSalary"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="salaryType">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="salaryType"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Salary Type *
                            </label>

                            <Field
                              as="select"
                              id="salaryType"
                              name="salaryType"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Salary Type</option>
                              <option value="1">Daily</option>
                              <option value="2">Monthly</option>
                            </Field>

                            <ErrorMessage
                              name="salaryType"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </section>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Attributes
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="experience">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="experience"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Experience *
                            </label>

                            <Field
                              as="select"
                              id="experience"
                              name="experience"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Experience</option>
                              <option value="1">1+ Year</option>
                              <option value="2">2+ Year</option>
                            </Field>

                            <ErrorMessage
                              name="experience"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="jobPosiiton">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="jobPosiiton"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Job Position *
                            </label>

                            <Field
                              as="select"
                              id="jobPosiiton"
                              name="jobPosiiton"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select jobPosiiton</option>
                              <option value="1">Account Manager</option>
                              <option value="2">Software Engineer</option>
                            </Field>

                            <ErrorMessage
                              name="jobPosiiton"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="education">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="education"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Education *
                            </label>

                            <Field
                              as="select"
                              id="education"
                              name="education"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Education</option>
                              <option value="1">High School </option>
                              <option value="2">Graduate</option>
                            </Field>

                            <ErrorMessage
                              name="education"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="work_place">
                        {({ field }) => (
                          <div>
                            <div className="pe-2 flex self-end w-full text-center mb-2">
                              <label
                                htmlFor="work_place *"
                                className="text-535252 text-16 font-400"
                              >
                                Work Place *
                              </label>
                            </div>

                            <Field
                              as="select"
                              id="work_place"
                              name="work_place"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Work Place</option>
                              <option value="1">Onsite</option>
                              <option value="2">Hybird</option>
                              <option value="3">Remote</option>
                            </Field>

                            <ErrorMessage
                              name="work_place"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="employeementType">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="employeementType"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Employeement Type *
                            </label>

                            <Field
                              as="select"
                              id="employeementType"
                              name="employeementType"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Type</option>
                              <option value="1">Full Time</option>
                              <option value="2">Part Time</option>
                            </Field>

                            <ErrorMessage
                              name="employeementType"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="skills">
                        {({ field, form }) => (
                          <div>
                            <label
                              htmlFor="skills"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Skills *
                            </label>

                            <select
                              {...field}
                              id="skills"
                              name="skills"
                              multiple
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 h-32" // Increased height using h-32
                              value={field.value || []} // Ensure it is an array
                              onChange={(event) => {
                                const options = event.target.options;
                                const value = [];
                                for (
                                  let i = 0, l = options.length;
                                  i < l;
                                  i++
                                ) {
                                  if (options[i].selected) {
                                    value.push(options[i].value);
                                  }
                                }
                                form.setFieldValue(field.name, value);
                              }}
                            >
                              <option value="1">Android Developer</option>
                              <option value="2">Full Stack Developer</option>
                            </select>

                            <ErrorMessage
                              name="skills"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                      
                    </div>
                  </div>
                </section>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Description
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap w-full">
                      <Field name="descriptions">
                        {({ field }) => (
                          <div className="w-full">
                            <div className="pe-2 flex self-end w-full text-center">
                              <label
                                htmlFor="Descriptions *"
                                className="mb-1 text-535252 text-16 font-400"
                              >
                                Description
                              </label>
                            </div>

                            <textarea
                              className="p-2 w-full text-gray-500 border border-gray-300 rounded hover:outline-none"
                              placeholder="Enter description..."
                              rows={4}
                            />
                            <ErrorMessage
                              name="descriptions"
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

export default LayoutHOC(CreateJob);
