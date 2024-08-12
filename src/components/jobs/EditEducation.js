import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_EDUCATION } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { useParams, Link } from "react-router-dom"; 
import useEditEducation from "../../hooks/useEditEducation"; 

const EditEducation = () => {

  const { id } = useParams();
  const positions = useEditEducation(id); // Fetch job position data for editing

  const user = useRequireAuth();
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    id: id, // Assuming id is a string
    name: "",
    name_hindi: "",
    name_marathi: "",
    name_punjabi: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (positions) {
      setInitialValues({
        ...initialValues,
        name: positions.name || "",
        name_hindi: positions.name_hindi || "",
        name_marathi: positions.name_marathi || "",
        name_punjabi: positions.name_punjabi || "",
      });
    }
  }, [positions]);

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("ID is required"), // Validation schema for ID
    name: Yup.string().required("Position Name (English) is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("id", values.id); // Include ID in form data
      formDataWithFile.append("name", values.name);
      formDataWithFile.append("name_hindi", values.name_hindi);
      formDataWithFile.append("name_marathi", values.name_marathi);
      formDataWithFile.append("name_punjabi", values.name_punjabi);

      const response = await fetch(CREATE_EDUCATION, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      if (response.ok) {
        setSuccessMessage("Job position updated successfully!");
        navigate(`/education`); // Redirect to listing page upon success
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
                Update Education
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
            {({ isSubmitting }) => (
              <Form id="jobPositionForm" encType="multipart/form-data">
                <Field name="id" type="hidden">
                  {({ field }) => <input {...field} type="hidden" />}
                </Field>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Education
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
                              English
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

                      <Field name="name_hindi">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="name_hindi"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Hindi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />

                            <ErrorMessage
                              name="name_hindi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="name_marathi">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="name_marathi"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Marathi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />

                            <ErrorMessage
                              name="name_marathi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="name_punjabi">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="name_punjabi"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Punjabi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />

                            <ErrorMessage
                              name="name_punjabi"
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
                    <Link to="/education">
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

export default LayoutHOC(EditEducation);
