import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_JOB_POSITION } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { useParams, Link } from "react-router-dom";
import useGetJobPosition from "../../hooks/useGetJobPosition";

const EditJobPosition = () => {
  const { id } = useParams();
  const positions = useGetJobPosition(id); // Fetch job position data for editing

  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    name_hindi: "",
    name_marathi: "",
    name_punjabi: "",
  });

  useEffect(() => {
    if (positions) {
      setInitialValues({
        name: positions.name || "",
        name_hindi: positions.name_hindi || "",
        name_marathi: positions.name_marathi || "",
        name_punjabi: positions.name_punjabi || "",
      });
    }
  }, [positions]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Position Name (English) is required"),
    name_hindi: Yup.string().required("Position Name (Hindi) is required"),
    name_marathi: Yup.string().required("Position Name (Marathi) is required"),
    name_punjabi: Yup.string().required("Position Name (Punjabi) is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("name_english", values.name);
      formDataWithFile.append("name_hindi", values.name_hindi);
      formDataWithFile.append("name_marathi", values.name_marathi);
      formDataWithFile.append("name_punjabi", values.name_punjabi);

      const response = await fetch(CREATE_JOB_POSITION, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      // Handle response or navigate to success page
      navigate(`/jobs_position/`);
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
                Update Job Position
              </h5>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize // Enable reinitialization when initialValues change
          >
            {({ isSubmitting }) => (
              <Form id="jobPositionForm" encType="multipart/form-data">
                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Positions
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
                              Position Name English
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
                              Position Name Hindi
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
                              Position Name Marathi
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
                              Position Name Punjabi
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
                    <Link to="/jobs_position">
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

export default LayoutHOC(EditJobPosition);
