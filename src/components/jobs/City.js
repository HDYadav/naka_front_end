import React, { useState, useEffect, Fragment } from "react";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useJobsPosition from "../../hooks/useJobsPosition";
import useCity from "../../hooks/useCity";

const City = () => {
  const positions = useCity();

  //console.log(positions?.data);

  return (
    <Fragment>
      <main id="maincontent">
        <div className="p-4 mt-14">
          <div className="flex flex-col bg-white p-4">
            <div className="flex justify-between items-center">
              <h5 className="text-203C50 font-Vietnam text-[28px] font-medium">
                State List
              </h5>
              <div className="flex items-center">
                <Link
                  to="/add_customer"
                  className="bg-1D4469 rounded-sm text-white rounded p-2 px-5 text-[14px]"
                  type="button"
                >
                  {/* + Create Job */}
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
                      <div className="flex justify-between">City</div>
                    </th>
                    {/* <th
                      scope="col"
                      className="font-normal px-6 py-3 text-left border"
                    >
                      <div className="flex justify-between">Details</div>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="border">
                  {positions &&
                    positions?.data?.city &&
                    positions?.data?.city.map((job) => (
                      <tr key={job.id} className="border border-neutral-200 ">
                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          {job.name}
                        </td>
                        {/* <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                          <Link to={{ pathname: `/job_details/${job.id}` }}>
                            Details
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default LayoutHOC(City);
