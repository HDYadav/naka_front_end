import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EDIT_EMPLOYER } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate, useParams } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useCompany from "../../hooks/useCompany";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useEditEmployer from "../../hooks/useEditEmployer";

const EditEmployer = () => {
  const { id } = useParams();
  const user = useRequireAuth();
  const navigate = useNavigate();
  const company = useCompany();
  const [selectedDate, setSelectedDate] = useState(null);
  const [file, setFile] = useState(null);
    const employerData = useEditEmployer(id);
    
   

  const [initialValues, setInitialValues] = useState({
    id: id,
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    company_size: "",
    organizationType: "",
    industryTypeId: "",
    website: "",
    establishmentYear: null, // Use null for Date fields
    about: "",
    password: "",
  });

  useEffect(() => {
    if (employerData) {
      setInitialValues({
        ...initialValues,
        name: employerData.name || "",
        company_name: employerData.company_name || "",
        email: employerData.email || "",
        mobile: employerData.mobile || "",
        company_size: employerData.company_size || "",
        organizationType: employerData.organizationType || "",
        website: employerData.website || "",
        industryTypeId: employerData.industryTypeId || "",
        establishmentYear: employerData.establishmentYear || "",          
        about: employerData.about || "",
        password: employerData.password || "",
        
      });
      setSelectedDate(
        employerData.establishmentYear
          ? new Date(employerData.establishmentYear)
          : null
      );
    }
  }, [employerData]);

    const validationSchema = Yup.object().shape({
      id: Yup.string().required("ID is required"),
      name: Yup.string().required("Name is required"),
      company_name: Yup.string().required("Company name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
      // company_size: Yup.string().required("Company size is required"),
      // organizationType: Yup.string().required("Organization type is required"),
      // industryTypeId: Yup.string().required("Industry type is required"),
      // website: Yup.string()
      //   .url("Invalid URL format")
      //   .required("Website is required"),
      // establishmentYear: Yup.date()
      //   .nullable()
      //   .required("Establishment year is required"),
      // about: Yup.string().required("About is required"),
      // password: Yup.string().required("Password is required"),
    });
 
        

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
        const formDataWithFile = new FormData(); 
        
        formDataWithFile.append("id", values.id); // Include ID in form data
        formDataWithFile.append("name", values.name);
        formDataWithFile.append("company_name", values.company_name);
        formDataWithFile.append("email", values.email);
        formDataWithFile.append("mobile", values.mobile);
        formDataWithFile.append("company_size", values.company_size); 
        formDataWithFile.append("organizationType", values.organizationType);
        formDataWithFile.append("industryTypeId", values.industryTypeId);
        formDataWithFile.append("website", values.website);
        formDataWithFile.append("establishmentYear", values.establishmentYear); 
        formDataWithFile.append("about", values.about);
        formDataWithFile.append("password", values.password); 

    //   Object.keys(values).forEach((key) => {
    //     formDataWithFile.append(key, values[key]);
    //   });

      if (file) {
        formDataWithFile.append("companyLogo", file);
        } 
        

      const response = await fetch(EDIT_EMPLOYER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      if (!response.ok) {
        throw new Error("Failed to update employer");
      }

      navigate(`/employer/`);
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating employer:", error);
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
              <h5 className="text-203C50 font-Vietnam text-32 font-medium">
                Edit Employer
              </h5>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form id="employerForm" encType="multipart/form-data">
                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Company Information
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="name">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Employer Name
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter employer name..."
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="company_name">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="company_name"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Company Name
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter company name..."
                            />
                            <ErrorMessage
                              name="company_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="email"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Email
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="email"
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
                          <div className="mb-3">
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

                      <Field name="company_size">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="company_size"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Company Size
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter company size..."
                            />
                            <ErrorMessage
                              name="company_size"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="organizationType">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="organizationType"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Organization Type
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter organization type..."
                            />
                            <ErrorMessage
                              name="organizationType"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="industryTypeId">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="industryTypeId"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Industry Type
                            </label>
                            <Field
                              as="select"
                              id="industryTypeId"
                              name="industryTypeId"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Industry Type</option>
                              {company?.data?.industry_type?.map(
                                (industryType) => (
                                  <option
                                    key={industryType.id}
                                    value={industryType.id}
                                  >
                                    {industryType.name}
                                  </option>
                                )
                              )}
                            </Field>
                            <ErrorMessage
                              name="industryTypeId"
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
                    Additional Information
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="website">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="website"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Website
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter website..."
                            />
                            <ErrorMessage
                              name="website"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="establishmentYear">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="establishmentYear"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Establishment Year
                            </label>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date);
                                setFieldValue("establishmentYear", date);
                              }}
                              dateFormat="yyyy-MM-dd"
                              className="inputBorder text-sm block w-full p-2.5 italic"
                            />
                            <ErrorMessage
                              name="establishmentYear"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="about">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="about"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              About
                            </label>
                            <textarea
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              placeholder="Enter about..."
                            />
                            <ErrorMessage
                              name="about"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="password">
                        {({ field }) => (
                          <div className="mb-3">
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

                      <Field name="companyLogo">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="companyLogo"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Company Logo
                            </label>
                            <input
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="file"
                              onChange={(event) => {
                                setFile(event.currentTarget.files[0]);
                              }}
                            />
                            <ErrorMessage
                              name="companyLogo"
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
                    <Link to="/employer">
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

export default LayoutHOC(EditEmployer);
