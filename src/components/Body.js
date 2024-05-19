import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Dashboard from './Dashboard'; 
import ProtectedRoute from "../utils/ProtectedRoute";
import SignupForm from "./form/SignupForm";
import JobsList from './jobs/JobsList';
import JobDetails from "./jobs/JobDetails";
import CreateJob from './company/CreateJob';
import JobsPosition from './jobs/JobsPosition';
import StateList from './jobs/StateList';
import EmploymentType from './jobs/EmploymentType';
import Skills from './jobs/Skills';

const Body = () => { 
  return (
    <div className="bg-gray-100">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
          
            <Route element={<CreateJob />} path="/create_job" />
            <Route element={<JobsList />} path="/jobs_list" />
            <Route element={<JobDetails />} path="/job_details/:id" />
            <Route element={<JobsPosition />} path="/jobs_position" />
            <Route element={<StateList />} path="/state" />
            <Route element={<EmploymentType />} path="/employment_type" />

            <Route element={<Skills />} path="/skills" />
          </Route>

          <Route element={<SignupForm />} path="/signup" />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );    
}


export default Body;
