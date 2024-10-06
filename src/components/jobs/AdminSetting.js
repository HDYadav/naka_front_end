import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UPDATE_CANDIDATE, UPDATE_PROFILE_PIC } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate, useParams } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
 
import "react-datepicker/dist/react-datepicker.css";
import useEditEmployer from "../../hooks/useEditEmployer";
 
const AdminSetting = () => {
  const { id } = useParams();
  const user = useRequireAuth();
  const navigate = useNavigate();
 
  const [file, setFile] = useState(null);
  const employerData = useEditEmployer(id);
  const [successMessage, setSuccessMessage] = useState(""); 

  const profilePicUrl = employerData?.profilePic;

  
  

  const [initialValues, setInitialValues] = useState({
    id: id, // Assuming id is a string
    name: "",
    email: "",
    mobile: "",
    password: "",
    profilePicture: null,

  });

  useEffect(() => {
    if (employerData) {
      setInitialValues({
        ...initialValues,
        name: employerData.name || "",
        email: employerData.email || "",
        mobile: employerData.mobile || "",       
        password: employerData.password || "",
      });
     
    }
  }, [employerData]);

  const validationSchema = Yup.object().shape({
    
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("id", values.id);
      formDataWithFile.append("name", values.name);
      formDataWithFile.append("email", values.email);
      formDataWithFile.append("mobile", values.mobile);
      formDataWithFile.append("password", values.password);

      if (values.profilePicture) {
        formDataWithFile.append("profilePicture", values.profilePicture);
      }

      const response = await fetch(UPDATE_PROFILE_PIC, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      if (response.ok) {
        // If successfully updated, set the success message
        setSuccessMessage("Updated successfully!");

        alert("Profile Updated successfully!");

        // Fetch the latest employer data again to update the profile picture and other fields
        const updatedData = await response.json();
        setInitialValues({
          ...initialValues,
          profilePicture: updatedData.profilePicture,
        });

        // Reload the current page to reflect changes or update the state as needed
        navigate(0); // Reloads the page to display updated info
      } else {
        throw new Error("Failed to UPDATE");
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


  return (
    <main className="p-4 sm:ml-64">
      <div className="p-4 mt-14">
        <div className="bg-F1F6F9 font-poppins">
          <div className="flex flex-col bg-white p-4 ">
            <div className="ms-4 flex justify-between items-center">
              <h5 className="text-203C50 font-Vietnam text-32 font-medium">
                Setings
                
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
                    Super Admin
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
                            <span className="block inputBorder text-sm p-2.5 italic bg-gray-100">
                              {field.value} {/* Displaying the value here */}
                            </span>
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
                            <span className="block inputBorder text-sm p-2.5 italic bg-gray-100">
                              {field.value} {/* Displaying the value here */}
                            </span>
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
                            <span className="block inputBorder text-sm p-2.5 italic bg-gray-100">
                              {field.value} {/* Displaying the value here */}
                            </span>
                            <ErrorMessage
                              name="mobile"
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

                      <div className="w-[110px] h-[110px]">
                        <img
                          className="rounded-full"
                          src={profilePicUrl}
                          alt=""
                        />
                      </div> 

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
                    </div>
                  </div>
                </section> 

                <div className="flex px-10 font-poppins pt-3 justify-between">
                  <div></div>
                  <div className="flex gap-4">
                    <Link to="/dashboard">
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
                      {isSubmitting ? "UPDATING..." : "UPDATE"}
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

export default LayoutHOC(AdminSetting);
