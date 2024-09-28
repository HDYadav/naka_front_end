import React from "react";
import LayoutHOC from "./LayoutHOC";
 
import useDashboardCount from "../hooks/useDashboardCount";
import JobsList from "./jobs/JobsList";
import Candidate from "./jobs/Candidate";

const Dashboard = () => {
  const rowData = useDashboardCount();

  console.log(rowData, "asdfsfdsf");

  // positions?.data?.state

  return (
    <main id="maincontent">
      <div className="p-4 mt-14">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Companies
            </h5>
            <p className="text-2xl font-bold">{rowData?.employer}</p>
          </div>

          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Active Companies
            </h5>
            <p className="text-2xl font-bold">{rowData?.active_employer}</p>
          </div>

          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              All Jobs
            </h5>
            <p className="text-2xl font-bold">{rowData?.all_jobs}</p>
          </div>

          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Active Jobs
            </h5>
            <p className="text-2xl font-bold">{rowData?.active_job}</p>
          </div>
        </div>

        <div>
          <hr />
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Total Candidates
            </h5>
            <p className="text-2xl font-bold">{rowData?.candidate}</p>
          </div>

          <div className="flex flex-col bg-white p-4 shadow rounded">
            <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Active Candidates
            </h5>
            <p className="text-2xl font-bold">{rowData?.active_candidate}</p>
          </div>
        </div>

        

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-8">
          

          <div className="flex flex-col bg-white p-4 shadow rounded">
            {/* <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
              Job List
            </h5> */}
            <JobsList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(Dashboard);
