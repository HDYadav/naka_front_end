import React from "react";
import LayoutHOC from "./LayoutHOC"; 
import useDashboardCount from "../hooks/useDashboardCount";
import JobsList from "./jobs/JobsList"; 
import { Link } from "react-router-dom";
import DashBoardJobList from "./jobs/DashBoardJobList";

const Dashboard = () => { 
  const rowData = useDashboardCount();

   return (
     <main id="maincontent" className="p-4 mt-14">
       <div className="p-4 mt-14">
         {/* Section 1 */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/employer"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 Companies
               </Link>
             </h5>
             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.employer}
             </p>
           </div>

           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/employer"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 Active Companies
               </Link>
             </h5>

             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.active_employer}
             </p>
           </div>

           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/jobs_list"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 All Jobs
               </Link>
             </h5>

             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.all_jobs}
             </p>
           </div>

           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/jobs_list"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 Active Jobs
               </Link>
             </h5>
             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.active_job}
             </p>
           </div>
         </div>

         <div>
           <hr />
         </div>

         {/* Section 2 */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/candidate"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 Total Candidates
               </Link>
             </h5>
             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.candidate}
             </p>
           </div>

           <div className="flex flex-col bg-white p-4 shadow rounded">
             <h5 className="text-203C50 font-Vietnam text-[24px] font-medium">
               <Link
                 to={"/candidate"}
                 className="flex items-center w-full p-2 text-black font-500 transition duration-75 rounded-lg pl-11 group hover:text-blue-500"
               >
                 Active Candidates
               </Link>
             </h5>
             <p className="flex items-end w-full p-2 text-black font-800 transition duration-75 rounded-lg pl-28 group">
               {rowData?.active_candidate}
             </p>
           </div>
         </div>

         {/* Section 3 */}
         <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-8">
           <div className="flex flex-col bg-white p-4 shadow rounded">
             <DashBoardJobList />
           </div>
         </div>
       </div>
     </main>
   );
};
 

export default LayoutHOC(Dashboard);
