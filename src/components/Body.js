import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../utils/ProtectedRoute";
import SignupForm from "./form/SignupForm";
import JobsList from "./jobs/JobsList";
import JobDetails from "./jobs/JobDetails";
import CreateJob from "./company/CreateJob";
import JobsPosition from "./jobs/JobsPosition";
import StateList from "./jobs/StateList";
import EmploymentType from "./jobs/EmploymentType";
import Skills from "./jobs/Skills";
import City from "./jobs/City";
import Promote from "./jobs/Promote";
import Experiance from "./jobs/Experiance";
import Education from "./jobs/Education";
import WorkPlace from "./jobs/WorkPlace";
import CreateJobPosition from "./jobs/CreateJobPosition";
import EditJobPosition from "./jobs/EditJobPosition";
import CreateEmpType from "./jobs/CreateEmpType";
import EditEmpType from "./jobs/EditEmpType";
import IndustryType from "./jobs/IndustryType";
import CreateIndustryType from "./jobs/CreateIndustryType";
import EditIndustryType from "./jobs/EditIndustryType";
import CreateSkills from "./jobs/CreateSkills";
import EditSkills from "./jobs/EditSkills";
import CreateExperiance from "./jobs/CreateExperiance";
import EditExperiance from "./jobs/EditExperiance";
import CreateEducation from "./jobs/CreateEducation";
import EditEducation from "./jobs/EditEducation";
import CreateWorkPlace from "./jobs/CreateWorkPlace";
import EditWorkPlace from "./jobs/EditWorkPlace";

const Body = () => {
  return (
    <div className="bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create_job" element={<CreateJob />} />
            <Route path="/jobs_list" element={<JobsList />} />
            <Route path="/job_details/:id" element={<JobDetails />} />
            <Route path="/jobs_position" element={<JobsPosition />} />
            <Route
              path="/create_job_position"
              element={<CreateJobPosition />}
            />
            <Route
              path="/edit_job_position/:id"
              element={<EditJobPosition />}
            />
            <Route path="/state" element={<StateList />} />
            <Route path="/city" element={<City />} />
            <Route path="/employment_type" element={<EmploymentType />} />
            <Route path="/create_employment_type" element={<CreateEmpType />} />
            <Route path="/edit_employment_type/:id" element={<EditEmpType />} />
            <Route path="/industry_type" element={<IndustryType />} />
            <Route
              path="/create_industry_type"
              element={<CreateIndustryType />}
            />
            <Route
              path="/edit_industry_type/:id"
              element={<EditIndustryType />}
            />
            <Route path="/promote" element={<Promote />} />
            <Route path="/experiance" element={<Experiance />} />
            <Route path="/create_experiance" element={<CreateExperiance />} />
            <Route path="/edit_experiance/:id" element={<EditExperiance />} />

            <Route path="/education" element={<Education />} />
            <Route path="/create_education" element={<CreateEducation />} />
            <Route path="/edit_education/:id" element={<EditEducation />} />
            <Route path="/edit_workplace/:id" element={<EditWorkPlace />} />


            <Route path="/work_place" element={<WorkPlace />} />
            <Route path="/create_workplace" element={<CreateWorkPlace />} />

            <Route path="/skills" element={<Skills />} />
            <Route path="/create_skills" element={<CreateSkills />} />
            <Route path="/edit_skills/:id" element={<EditSkills />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Body;
