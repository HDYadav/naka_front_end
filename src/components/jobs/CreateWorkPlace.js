import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_EDUCATION, CREATE_WORKPLACE } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";

import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";

const CreateWorkPlace = () => {

  const user = useRequireAuth();

  const navigate = useNavigate();

  const initialValues = {
    name_hindi: "",
    name_marathi: "",
    name_punjabi: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("default name  is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("name", values.name);
      formDataWithFile.append("name_hindi", values.name_hindi);
      formDataWithFile.append("name_marathi", values.name_marathi);
      formDataWithFile.append("name_punjabi", values.name_punjabi);

      const response = await fetch(CREATE_WORKPLACE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      // console.log(response);
      // return false;

      navigate(`/work_place/`);
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
                Create WorkPlace
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
                    WorkPlace
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
                              className="block mb-2 text-535252 text-16  font-400"
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
                              htmlFor="Marathi"
                              className="block mb-2  text-535252 text-16  font-400 "
                            >
                              Marathi
                            </label>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter marathi emptype ..."
                            />

                            <ErrorMessage
                              name="name_marathi"
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <ErrorMessage
                              name="ind_type_marathi"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>
                      <Field name="name_punjabi">
                        {({ field }) => (
                          <div>
                            <div className="mb-2">
                              <label
                                htmlFor="Punjabi"
                                className="mb-1 text-535252 text-16 font-400"
                              >
                                WorkPlace
                              </label>
                            </div>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="text"
                              placeholder="Enter total_vacancies..."
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
                    <Link to="/work_place">
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

export default LayoutHOC(CreateWorkPlace);
