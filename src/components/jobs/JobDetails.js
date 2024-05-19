import React from "react";
import LayoutHOC from "../LayoutHOC";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { JOB_DETAILS } from "../../utils/constants";
import { useParams } from "react-router-dom";
import useJobsDetails from "../../hooks/useJobsDetails";
import { FaNetworkWired } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaBuromobelexperte } from "react-icons/fa6";
import { MdOutlineCastForEducation } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";


const JobDetails = () => {

  const { id } = useParams();
  const details = useJobsDetails(id);  
  
const Skills = details?.data?.[0]?.skills;

 

  return (
    <main id="maincontent" className="p-4 mt-14">
      <div className="bg-White py-2  px-3 rounded shadow-2">
        <div className="flex gap-1 items-center justify-between">
          <h1 className="text-base"> {details?.data?.[0]?.jobPosiiton} </h1>
          <div className="flex gap-1 items-center justify-between">
            <Link to="/jobs_list" className="text-blue-600">
              <IoMdArrowBack />
            </Link>

            {/* <BiEdit className="text-xl" />
            <MdDeleteOutline className="text-xl" /> */}
          </div>
        </div>
        {/* Details section */}
        <div className="grid gap-1 grid-cols-[120px,250px,1fr] my-3">
          <div className="w-[110px] h-[110px]">
            <img
              className="rounded-full"
              src="https://s3.envato.com/files/385317130/Templatecookie-favicon.png"
              alt="User Logo"
            />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <h2 className="text-base leading-5">
              {details?.data?.[0]?.jobPosiiton} <br />
              <small className="text-xs">
                Employeement Type · {details?.data?.[0]?.employeementType}
              </small>
            </h2>
            <div className="flex gap-2">
              <FaRupeeSign className="text-blue-600" />
              <h3 className="text-base leading-5">
                {details?.data?.[0]?.minSalary} -{details?.data?.[0]?.maxSalary}
                <small className="text-xs"> Monthly</small>
              </h3>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1 flex-col font-medium">
              <FaNetworkWired className="text-blue-600" />

              <span className="text-xs">Work Place</span>
              <h4 className="text-base">{details?.data?.[0]?.workPlace}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineRealEstateAgent className="text-blue-600" />

              <span className="text-xs">State</span>
              <h4 className="text-base">{details?.data?.[0]?.state}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaCity className="text-blue-600" />

              <span className="text-xs">City</span>
              <h4 className="text-base">{details?.data?.[0]?.city}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineViewCompactAlt className="text-blue-600" />

              <span className="text-xs">Company</span>
              <h4 className="text-base">{details?.data?.[0]?.company}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaRupeeSign className="text-blue-600" />

              <span className="text-xs">Salary Type</span>
              <h4 className="text-base">{details?.data?.[0]?.salaryType}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaBuromobelexperte className="text-blue-600" />

              <span className="text-xs">Experience</span>
              <h4 className="text-base">{details?.data?.[0]?.experience}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineCastForEducation className="text-blue-600" />

              <span className="text-xs">Education</span>
              <h4 className="text-base">{details?.data?.[0]?.education}</h4>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 grid gap-1 grid-cols-[70%,1fr]">
          <div className="px-2">
            <h3 className="my-3 text-base">Description</h3>
            <p className="text-sm">{details?.data?.[0]?.description}</p>
          </div>
          <div className="px-2 border-l border-gray-200">
            {/* Categories */}
            <div className="my-3">
              <h3 className="text-base mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <div>
                  <div>
                    {Skills && Skills.length > 0 ? (
                      Skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                        >
                          {skill.name}
                          {/* Render the specific property of each skill object */}
                        </span>
                      ))
                    ) : (
                      <p>No skills found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              <h3 className="text-base mb-2">Language</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  English
                </span>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Hindi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(JobDetails);
