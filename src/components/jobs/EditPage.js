import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PAGES_UPDATE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useNavigate, useParams } from "react-router-dom";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useEditPage from "../../hooks/useEditPage";
import TextEditor from "./TextEditor";

const EditPage = () => {
  const user = useRequireAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const positions = useEditPage(id);

  // Initialize state for form values
  const [initialValues, setInitialValues] = useState({
    id: id, // Assuming id is a string
    page_name: "",
    heading: "",
    descriptions: "",
  });

  // Update initialValues when positions change
  useEffect(() => {
    if (positions) {
      setInitialValues({
        page_name: positions?.page_name || "",
        heading: positions?.heading || "",
        descriptions: positions?.descriptions || "",
      });
    }
  }, [positions]);

 

  // Schema for form validation
  const validationSchema = Yup.object().shape({
    page_name: Yup.string().required("Page name is required"),
    heading: Yup.string().required("Heading is required"),
    descriptions: Yup.string().required("Descriptions are required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const authToken = user.token;
      const formData = new FormData();

      formData.append("page_name", values.page_name);
      formData.append("heading", values.heading);
      formData.append("descriptions", values.descriptions);

      const response = await fetch(`${PAGES_UPDATE}${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update page");
      }

      navigate(`/pages`);
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
                Update Page
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
              <Form id="companyProfileForm" encType="multipart/form-data">
                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Page
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-3 w-full">
                      <Field name="page_name">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="page_name"
                              className="block mb-2 text-535252 text-16 font-400 text-535252"
                            >
                              Page Name
                            </label>
                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />
                            <ErrorMessage
                              name="page_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="heading">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="heading"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Heading
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter title..."
                            />

                            <ErrorMessage
                              name="heading"
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
                    Full Descriptions
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap grid grid-cols-1 w-full">
                      <Field name="descriptions">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="descriptions"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Descriptions
                            </label>

                            <TextEditor
                              value={field.value}
                              onChange={(content) =>
                                setFieldValue("descriptions", content)
                              }
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

export default LayoutHOC(EditPage);
