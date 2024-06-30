import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CREATE_JOB } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/companyProfileSlice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useCompany from "../../hooks/useCompany";
import LayoutHOC from "../LayoutHOC";

const CreateJob = () => {
  const user = useRequireAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const company = useCompany();

  const initialValues = {
    job_title: "",
    company: "",
    promote: "",
    totalVacancy: "",
    deadline: null,
    country: "",
    state: "",
    city: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "",
    experience: "",
    jobPosiiton: "",
    education: "",
    work_place: "",
    employeementType: "",
    skills: [],
    description: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("Company is required"),
    totalVacancy: Yup.string().required("Total vacancy is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const Authtoken = user.token;
      const formDataWithFile = new FormData();

      formDataWithFile.append("job_title", values.job_title);
      formDataWithFile.append("company", values.company);
      formDataWithFile.append("employeementType", values.employeementType);
      formDataWithFile.append("promote", values.promote);
      formDataWithFile.append("totalVacancy", values.totalVacancy);
      formDataWithFile.append("minSalary", values.minSalary);
      formDataWithFile.append("maxSalary", values.maxSalary);
      formDataWithFile.append("workPlace", values.work_place);
      formDataWithFile.append(
        "deadline",
        moment(values.deadline).format("YYYY-MM-DD")
      );
      formDataWithFile.append("country", values.country);
      formDataWithFile.append("state", values.state);
      formDataWithFile.append("city", values.city);
      formDataWithFile.append("jobPosiiton", values.jobPosiiton);
      formDataWithFile.append("salaryType", values.salaryType);
      formDataWithFile.append("experience", values.experience);
      formDataWithFile.append("education", values.education);
      formDataWithFile.append("skills", values.skills);
      formDataWithFile.append("description", values.description);

      const response = await fetch(CREATE_JOB, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Authtoken}`,
        },
        body: formDataWithFile,
      });

      const data = await response.json();
      dispatch(setProfile(data.data));

      navigate(`/jobs_list/`);
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
          <div className="flex flex-col bg-white p-4">
            <div className="ms-4 flex justify-between items-center">
              <h5 className="text-203C50 font-Vietnam text-32 font-medium">
                Create Job
              </h5>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
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

                      <Field name="company">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="company"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Select Company *
                            </label>

                            <Field
                              as="select"
                              id="company"
                              name="company"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Company</option>
                              {company?.data?.company?.map((company) => (
                                <option key={company.id} value={company.id}>
                                  {company.name}
                                </option>
                              ))}
                            </Field>

                            <ErrorMessage
                              name="company"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="promote">
                        {({ field }) => (
                          <div>
                            <label
                              htmlFor="promote"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Promote Type *
                            </label>

                            <Field
                              as="select"
                              id="promote"
                              name="promote"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Promote Type</option>
                              {company?.data?.promote?.map((promote) => (
                                <option key={promote.id} value={promote.id}>
                                  {promote.name}
                                </option>
                              ))}
                            </Field>

                            <ErrorMessage
                              name="promote"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="totalVacancy">
                        {({ field }) => (
                          <div>
                            <div className="mb-2">
                              <label
                                htmlFor="totalVacancy"
                                className="mb-1 text-535252 text-16 font-400"
                              >
                                Total Vacancies *
                              </label>
                            </div>

                            <input
                              {...field}
                              className="inputBorder text-sm block w-full p-2.5 italic"
                              type="number"
                              placeholder="Enter total_vacancies..."
                            />
                            <ErrorMessage
                              name="totalVacancy"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        )}
                      </Field>

                      <Field name="deadline">
                        {({ field, form }) => (
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
                              selected={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date);
                                form.setFieldValue("deadline", date);
                              }}
                              dateFormat="yyyy-MM-dd"
                              className="inputBorder text-sm block w-full p-2.5 italic"
                            />

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
                      <Field name="country">
                        {({ field }) => (
                          <div className="mb-3">
                            <label
                              htmlFor="country"
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
                              name="country"
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
                              className="block mb-2 text-535252 text-16 font-400"
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
                              {company?.data?.state?.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
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
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              City *
                            </label>

                            <Field
                              as="select"
                              id="city"
                              name="city"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select City</option>
                              {company?.data?.city?.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </Field>
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
                              type="number"
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
                              type="number"
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
                              className="block mb-2 text-535252 text-16 font-400"
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
                              {company?.data?.salaryType?.map((salaryType) => (
                                <option
                                  key={salaryType.id}
                                  value={salaryType.id}
                                >
                                  {salaryType.name}
                                </option>
                              ))}
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
                              className="block mb-2 text-535252 text-16 font-400"
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
                          <div>
                            <label
                              htmlFor="jobPosiiton"
                              className="block mb-2 text-535252 text-16 font-400"
                            >
                              Job Position *
                            </label>

                            <Field
                              as="select"
                              id="jobPosiiton"
                              name="jobPosiiton"
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5"
                            >
                              <option value="">Select Job Position</option>
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
                          <div>
                            <label
                              htmlFor="education"
                              className="block mb-2 text-535252 text-16 font-400"
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
                              {company?.data?.workplace?.map((workplace) => (
                                <option key={workplace.id} value={workplace.id}>
                                  {workplace.name}
                                </option>
                              ))}
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
                              className="block mb-2 text-535252 text-16 font-400"
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
                              {company?.data?.emp_type?.map((emp_type) => (
                                <option key={emp_type.id} value={emp_type.id}>
                                  {emp_type.name}
                                </option>
                              ))}
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
                              className="form-select border border-gray-300 text-gray-900 text-sm block w-full px-2.5 h-32"
                              value={field.value || []}
                              onChange={(event) => {
                                const options = event.target.options;
                                const value = [];
                                for (let i = 0; i < options.length; i++) {
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
                    </div>
                  </div>
                </section>

                <section className="bg-white mt-5 pt-0 py-8">
                  <h3 className="text-base p-3 border-b border-gray-200 mb-4">
                    Description
                  </h3>
                  <div className="flex px-5 justify-between mb-4 w-full">
                    <div className="ps-3 gap-x-8 justify-around font-poppins flex-wrap w-full">
                      <Field name="description">
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
                              {...field}
                              className="p-2 w-full text-gray-500 border border-gray-300 rounded hover:outline-none"
                              placeholder="Enter description..."
                              rows={4}
                            />

                            <ErrorMessage
                              name="description"
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
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(CreateJob);
