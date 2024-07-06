import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EMAIL_TEMPLATE_UPDATE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useEditEmailTemplate from "../../hooks/useEditEmailTemplate";
import TextEditor from "./TextEditor";

const EditEmailTemplate = () => {
  const user = useRequireAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const positions = useEditEmailTemplate(id);

  // Initialize state for form values
  const [initialValues, setInitialValues] = useState({
    id: id, // Assuming id is a string
    name: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Update initialValues when positions change
  useEffect(() => {
    if (positions) {
      setInitialValues({
        name: positions?.name || "",
        subject: positions?.subject || "",
        message: positions?.message || "",
      });
    }
  }, [positions]);

  // Schema for form validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Page name is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const authToken = user.token;
      const formData = new FormData();

      formData.append("subject", values.subject);
      formData.append("message", values.message);

      const response = await fetch(`${EMAIL_TEMPLATE_UPDATE}${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update page");
      }

      setSuccessMessage("Email template updated successfully!");
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating page:", error);
      setFieldError("form", "An error occurred while updating the page.");
      setSubmitting(false);
    }
  };

  if (!positions) {
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
                Update Email Template
              </h5>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{successMessage}</span>
              <button
                type="button"
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setSuccessMessage("")}
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 10.707.707L10 10.707l3.641 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.707z" />
                </svg>
              </button>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form id="companyProfileForm" encType="multipart/form-data">
                <div className="flex">
                  <div className="w-1/4 bg-gray-100 p-4">
                    <NavLink
                      to={`/edit_email_template/1`}
                      className="block p-2 mb-2 bg-gray-200 border border-gray-300 rounded focus:outline-none w-full text-left"
                      activeClassName="bg-blue-500 text-white"
                    >
                      New User
                    </NavLink>
                    <NavLink
                      to={`/edit_email_template/2`}
                      className="block p-2 mb-2 bg-gray-200 border border-gray-300 rounded focus:outline-none w-full text-left"
                      activeClassName="bg-blue-500 text-white"
                    >
                      Edited Job
                    </NavLink>
                    <NavLink
                      to={`/edit_email_template/3`}
                      className="block p-2 mb-2 bg-gray-200 border border-gray-300 rounded focus:outline-none w-full text-left"
                      activeClassName="bg-blue-500 text-white"
                    >
                      New User Registered
                    </NavLink>
                    <NavLink
                      to={`/edit_email_template/4`}
                      className="block p-2 mb-2 bg-gray-200 border border-gray-300 rounded focus:outline-none w-full text-left"
                      activeClassName="bg-blue-500 text-white"
                    >
                      New Candidate
                    </NavLink>
                    <NavLink
                      to={`/edit_email_template/5`}
                      className="block p-2 mb-2 bg-gray-200 border border-gray-300 rounded focus:outline-none w-full text-left"
                      activeClassName="bg-blue-500 text-white"
                    >
                      New Company
                    </NavLink>
                  </div>
                  <div className="w-3/4 p-4">
                    <section id="newUser" className="bg-white mt-5 pt-0 py-8">
                      <div className="flex px-5 justify-between mb-4 w-full">
                        <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                          <Field name="name">
                            {({ field }) => (
                              <div className="mb-3">
                                <label
                                  htmlFor="name"
                                  className="block mb-2 text-535252 text-16 font-400 text-535252"
                                >
                                  Page Name
                                </label>
                                <input
                                  {...field}
                                  className="inputBorder text-sm block w-full p-2.5 italic"
                                  type="text"
                                  placeholder="Enter title..."
                                  disabled
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            )}
                          </Field>

                          <Field name="subject">
                            {({ field }) => (
                              <div>
                                <label
                                  htmlFor="subject"
                                  className="block mb-2 text-535252 text-16 font-400"
                                >
                                  Subject
                                </label>

                                <input
                                  {...field}
                                  className="inputBorder text-sm block w-full p-2.5 italic"
                                  type="text"
                                  placeholder="Enter subject..."
                                />

                                <ErrorMessage
                                  name="subject"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </section>

                    <section id="editedJob" className="bg-white mt-5 pt-0 py-8">
                      <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                         {positions?.name}
                      </h3>
                      <div className="flex px-5 justify-between mb-4 w-full">
                        <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-1 w-full">
                          <Field name="message">
                            {({ field }) => (
                              <div>
                                <label
                                  htmlFor="message"
                                  className="block mb-2 text-535252 text-16 font-400"
                                >
                                  Message
                                </label>

                                <TextEditor
                                  value={field.value}
                                  onChange={(content) =>
                                    setFieldValue("message", content)
                                  }
                                />

                                <ErrorMessage
                                  name="message"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="flex px-10 font-poppins pt-3 justify-between">
                  <div></div>
                  <div className="flex gap-4">
                    <Link to="/pages">
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

export default LayoutHOC(EditEmailTemplate);
