import React, { useState, useEffect, Fragment } from "react";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useJobsList from "../../hooks/useJobsList";
import Shimmer from "../Shimmer";
import { useSelector } from "react-redux";

const JobsList = () => {
  const allJobs = useJobsList();
  const [jobs, setJobs] = useState(allJobs?.data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    // Define your filter options here, e.g., company, workplace, etc.
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(1);

  useEffect(() => {
    if (allJobs?.data) {
      setJobs(allJobs.data);
    }
  }, [allJobs]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert search query to lowercase
    setSearchQuery(searchValue);

    // Apply filtering here based on searchQuery
    // Filter jobs array based on searchQuery
    const filteredJobs = allJobs?.data.filter(
      (job) =>
        job.jobPosition && job.jobPosition.toLowerCase().includes(searchValue)
    );
    setJobs(filteredJobs || []);
  };

  // Handle filter selection change
  const handleFilterChange = (filterName, selectedValue) => {
    // Update filters state
    setFilters({ ...filters, [filterName]: selectedValue });
    // Apply filtering based on selected filters
    // Implement filtering logic here
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((jobs?.length || 0) / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Fragment>
      <main id="maincontent">
        <div className="p-4 mt-14">
          <div className="flex flex-col bg-white p-4">
            <div className="flex justify-between items-center">
              <h5 className="text-203C50 font-Vietnam text-[28px] font-medium">
                Jobs List
              </h5>
              <div className="flex items-center">
                <Link
                  to="/add_customer"
                  className="bg-1D4469 rounded-sm text-white rounded p-2 px-5 text-[14px]"
                  type="button"
                >
                  + Create Job
                </Link>
                <i className="bi bi-three-dots-vertical text-2xl text-535252"></i>
              </div>
            </div>
          </div>

          <div className="my-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="table-search-users"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>

          <div className="mb-4 border-gray-200"></div>
          <div id="default-styled-tab-content">
            <div
              className=""
              id="styled-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <table className="bg-white min-w-full border border-neutral-200 text-center text-sm text-surface text-2C495D font-poppins">
                <thead className="border-neutral-200 border">
                  <tr>
                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">Job Position</div>
                    </th>
                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">Company</div>
                    </th>
                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">Work Place</div>
                    </th>
                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">City</div>
                    </th>
                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">
                        Employeement Type
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">Details</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="border">
                  {Array.isArray(jobs) &&
                    currentJobs.map((job) => (
                      <tr key={job.id} className="border border-neutral-200 ">
                        <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 text-2999BC px-6 py-2 font-medium text-left">
                          <Link to="/candidate-details">{job.jobPosiiton}</Link>
                        </td>
                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          {job.company}
                        </td>
                        <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                          {job.workPlace}
                        </td>
                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          {job.city}
                        </td>
                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          {job.employeementType}
                        </td>

                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          <Link
                            to={{
                              pathname: `/job_details/${job.id}`,
                              state: { job: job.id },
                            }}
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>

                {/* Pagination */}
                <ul className="flex my-2 ml-3">
                  {pageNumbers.map((number) => (
                    <li key={number} className="mr-2">
                      <a
                        onClick={() => paginate(number)}
                        href="#"
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 inline-block"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </table>
            </div>
            <div
              className="hidden p-4 rounded-lg"
              id="styled-dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              {/* Content for dashboard tab */}
            </div>
            <div
              className="hidden p-4 rounded-lg"
              id="styled-settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              {/* Content for settings tab */}
            </div>
            <div
              className="hidden p-4 rounded-lg"
              id="styled-contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              {/* Content for contacts tab */}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default LayoutHOC(JobsList);
