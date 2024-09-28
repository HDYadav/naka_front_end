import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  UPDATE_CANDIDATE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { useParams, Link } from "react-router-dom"; 
import useCompany from "../../hooks/useCompany";
import useEditCandidate from "../../hooks/useEditCandidate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS for DatePicker

const EditCandidate = () => {

  const { id } = useParams();  
  const user = useRequireAuth(); 
  const navigate = useNavigate(); 

  //const { candidate } = useEditCandidate(id) || {};
  
  const { candidate } = useEditCandidate(id); 


  const [selectedDate, setSelectedDate] = useState(null);  
  const company = useCompany();  
  //console.log(company?.data?.languages);
  const [initialValues, setInitialValues] = useState({
    id: id, // Assuming id is a string
    name: "",
    email: "",
    mobile: "",
    //date_of_birth: null,
    dob:null,
    password: "",
    experience: "",
    jobPosiiton: "",
    education: "",
    skills: [],
    languages: [],
    profilePicture: null,
    resume: null,
    maritalStatus: "",
    gender: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (candidate) {
      setInitialValues({
        ...initialValues,
        name: candidate.name || "",
        email: candidate.email || "",
        mobile: candidate.mobile || "",
        // password: candidate.password || "",
        experience: candidate.experienced || "",
        jobPosiiton: candidate.professionId || "",
        education: candidate.educationId || "",
        skills: candidate.skills || "",
        languages: candidate.languages || "",
        maritalStatus: candidate.maritalStatus || "",
        gender: candidate.gender || "",
        resume: candidate.resume || "",
        date_of_birth: candidate?.dob || "",
      });
      // setSelectedDate(new Date(candidate.dob));
      
       setSelectedDate(candidate.dob ? new Date(candidate.dob) : null);
      
    }
  });

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"), // Validation schema for ID
    name: Yup.string().required("Position Name (English) is required"),
    date_of_birth: Yup.string().required("Date Of Birthe is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {

      let dateOfBirth = values.date_of_birth;

      if (typeof dateOfBirth === "string") {
        // Convert string to Date object if it's not already
        dateOfBirth = new Date(dateOfBirth);
      }

      // Format the date as dd mm yyyy
      const day = dateOfBirth.getDate().toString().padStart(2, "0"); // Get day and pad with zero if necessary
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-indexed) and pad with zero if necessary
      const year = dateOfBirth.getFullYear(); // Get full year

      const formattedDate = `${day} ${month} ${year}`;
      
       //const formattedDate = `${year}-${month}-${day}`;


      //console.log(formattedDate);



      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("id", values.id); // Include ID in form data
      formDataWithFile.append("name", values.name);
      formDataWithFile.append("email", values.email);
      formDataWithFile.append("mobile", values.mobile);
      //formDataWithFile.append("date_of_birth", values.date_of_birth);
      formDataWithFile.append("date_of_birth", formattedDate);
      formDataWithFile.append("password", values.password);
      formDataWithFile.append("experience", values.experience);
      formDataWithFile.append("jobPosiiton", values.jobPosiiton);
      formDataWithFile.append("education", values.education);
      formDataWithFile.append("skills", values.skills);
      formDataWithFile.append("languages", values.languages);
      if (values.profilePicture) {
        formDataWithFile.append("profilePicture", values.profilePicture);
      }
      if (values.resume) {
        formDataWithFile.append("resume", values.resume);
      }
      formDataWithFile.append("maritalStatus", values.maritalStatus);
      formDataWithFile.append("gender", values.gender);

      const response = await fetch(UPDATE_CANDIDATE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      if (response.ok) {
        setSuccessMessage("Job position updated successfully!");
        navigate(`/candidate`); // Redirect to listing page upon success
      } else {
        throw new Error("Failed to create job position");
      }

      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFieldError(
        "form",
        "An error occurred while submitting the form. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (!candidate) {
    // Handle loading state or error state if positions is undefined
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 sm:ml-64">
      <div className="p-4 mt-14">
        <div className="bg-F1F6F9 font-poppins">
          <div className="flex flex-col bg-white p-4">
            <div className="ms-4 flex justify-between items-center">
              <h5 className="text-203C50 font-Vietnam text-32 font-medium">
                Update Candidate
              </h5>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-200 text-green-800 p-3 mt-4 mb-4 rounded-md">
              {successMessage}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form id="jobPositionForm" encType="multipart/form-data">
                <Field name="id" type="hidden">
                  {({ field }) => <input {...field} type="hidden" />}
                </Field>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Candidate
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
                              Name
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter name..."
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Email
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter email..."
                            />

                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="mobile">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="mobile"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Mobile
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter mobile number..."
                            />

                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="date_of_birth">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="date_of_birth"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Date Of Birth
                            </label>

                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date);
                                setFieldValue("date_of_birth", date);
                              }}
                              dateFormat="yyyy-MM-dd"
                              className="inputBorder text-sm block w-full p-2.5 italic"
                            />

                            <ErrorMessage
                              name="date_of_birth"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="password">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Password
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="password"
                              placeholder="Enter password..."
                            />
                            <ErrorMessage
                              name="password"
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
                          <div className="mb-4">
                            
                            {/* Added margin-bottom */}
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
                              {company?.data?.experience?.map((experience) => (
                                <option
                                  key={experience.id}
                                  value={experience.id}
                                >
                                  {experience.name}
                                </option>
                              ))}
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
                          <div className="mb-4">
                            
                            {/* Added margin-bottom */}
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
                              {company?.data?.job_position?.map(
                                (job_position) => (
                                  <option
                                    key={job_position.id}
                                    value={job_position.id}
                                  >
                                    {job_position.name}
                                  </option>
                                )
                              )}
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
                          <div className="mb-4">
                          
                            {/* Added margin-bottom */}
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
                              {company?.data?.education?.map((education) => (
                                <option key={education.id} value={education.id}>
                                  {education.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="education"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="skills">
                        {({ field, form }) => (
                          <div className="mb-4">
                            
                            {/* Added margin-bottom */}
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
                              {company?.data?.skills?.map((skills) => (
                                <option key={skills.id} value={skills.id}>
                                  {skills.name}
                                </option>
                              ))}
                            </select>
                            <ErrorMessage
                              name="skills"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="languages">
                        {({ field, form }) => (
                          <div className="mb-4">
                            <label
                              htmlFor="languages"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Language *
                            </label>
                            <select
                              {...field}
                              id="languages"
                              name="languages"
                              multiple
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 h-32"
                              value={field.value || []}
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
                              {company?.data?.languages?.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                  {lang.name}
                                </option>
                              ))}
                            </select>
                            <ErrorMessage
                              name="languages"
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
                    Others
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="profilePicture">
                        {({ form }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="profilePicture"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Profile Picture
                            </label>
                            <input
                              id="profilePicture"
                              name="profilePicture"
                              type="file"
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              onChange={(event) => {
                                form.setFieldValue(
                                  "profilePicture",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <ErrorMessage
                              name="profilePicture"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="resume">
                        {({ form }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="profilePicture"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Resume
                            </label>
                            <input
                              id="resume"
                              name="profilePicture"
                              type="file"
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              onChange={(event) => {
                                form.setFieldValue(
                                  "profilePicture",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <ErrorMessage
                              name="profilePicture"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="maritalStatus">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="maritalStatus"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Marital Status *
                            </label>

                            <Field
                              as="select"
                              id="maritalStatus"
                              name="maritalStatus"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select</option>
                              <option value="UnMarried">UnMarried</option>
                              <option value="Married">Married</option>
                            </Field>

                            <ErrorMessage
                              name="maritalStatus"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="gender">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="gender"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Gender *
                            </label>

                            <Field
                              as="select"
                              id="gender"
                              name="gender"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Field>

                            <ErrorMessage
                              name="maritalStatus"
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
                    <Link to="/city">
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
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(EditCandidate);
