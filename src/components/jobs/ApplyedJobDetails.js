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
import useApplyedJobDetails from "../../hooks/useApplyedJobDetails";

const ApplyedJobDetails = () => {

    const { id } = useParams();
    
    const details = useApplyedJobDetails(id);
    
    console.log(details);

 

  const Skills = details?.data?.skills;

  return (
    <main id="maincontent" className="p-4 mt-14">
      <div className="bg-White py-2  px-3 rounded shadow-2">
        <div className="flex gap-1 items-center justify-between">
          <h1 className="text-base"> {details?.data?.jobPosiiton} </h1>
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
              {details?.data?.jobPosiiton} <br />
              <small className="text-xs">{details?.data?.name}</small>
            </h2>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1 flex-col font-medium">
              <FaNetworkWired className="text-blue-600" />

              <span className="text-xs">Phone</span>
              <h4 className="text-base">{details?.data?.mobile}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineRealEstateAgent className="text-blue-600" />

              <span className="text-xs">Email</span>
              <h4 className="text-base">{details?.data?.email}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaCity className="text-blue-600" />

              <span className="text-xs">Experiance</span>
              <h4 className="text-base">{details?.data?.experience}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineViewCompactAlt className="text-blue-600" />

              <span className="text-xs">Education</span>
              <h4 className="text-base">{details?.data?.education}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaCity className="text-blue-600" />

              <span className="text-xs">Gender</span>
              <h4 className="text-base">{details?.data?.gender}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaBuromobelexperte className="text-blue-600" />

              <span className="text-xs">Deadline</span>
              <h4 className="text-base">{details?.data?.deadline}</h4>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 grid gap-1 grid-cols-[70%,1fr]">
          <div className="px-2">
            <h3 className="my-3 text-base">Description</h3>
            <p className="text-sm">{details?.data?.description}</p>
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

export default LayoutHOC(ApplyedJobDetails);
