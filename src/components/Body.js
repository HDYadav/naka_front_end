import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Dashboard from './Dashboard'; 
import Customer from './customer/Customer'; 
import ProtectedRoute from '../utils/ProtectedRoute';
import AddCustomer from './customer/AddCustomer';
import AddCompany from './company/AddCompany';
import AddCustomer1 from './customer/AddCustomer1';
import Importcha from './chartofaccount/Importcha';
import AssetList from './chartofaccount/AssetList';
import EditCompany from './company/EditCompany'; 
import SignupForm from './form/SignupForm';
import AddVendor from './company/AddVendor';
import JobsList from './jobs/JobsList';
import CandidateDetails  from "./jobs/CandidateDetails"

const Body = () => { 
  return (
    <div className="bg-gray-100">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<Customer />} path="/customers" />
            <Route element={<AddCustomer />} path="/add_customer" />
            <Route element={<AddCustomer1 />} path="/add_customer1" />
            <Route element={<AddCompany />} path="/add_company" />
            <Route element={<AddVendor />} path="/add_vendor" />
            <Route element={<EditCompany />} path="/edit_company/:id" />

            <Route element={<Importcha />} path="/import_chart_of_account" />
            <Route element={<AssetList />} path="/asset_chart_of_account" />

            <Route element={<JobsList />} path="/jobs_list" />
            <Route element={<CandidateDetails />} path="/candidate-details" />

          </Route>

          <Route element={<SignupForm />} path="/signup" />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );    
}


export default Body;
