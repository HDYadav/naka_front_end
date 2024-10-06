import React from "react";
import LayoutHOC from "../LayoutHOC";
import { useParams } from "react-router-dom";
import { FaGraduationCap, FaNetworkWired, FaRing, FaUserTie, FaVenusMars } from "react-icons/fa";
import { MdOutlineRealEstateAgent, MdWorkOutline } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { MdOutlineViewCompactAlt } from "react-icons/md";
 
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import useCandidateDetails from "../../hooks/useCandidateDetails";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DELETE_CANDIDATE, PROFILE_PIC_URL } from "../../utils/constants";
import { AiTwotoneFilePdf } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";



const CandidateDetails = () => {

  const { id } = useParams();
  const details = useCandidateDetails(id);
  const user = useSelector((state) => state.user);

 

  const Skills = details?.data?.skills;
  const Languages = details?.data?.languages;
  const profilePicUrl = details?.data?.profilePic;
  const resume = PROFILE_PIC_URL + details?.data?.resume;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    
    if (confirmDelete) {
      try {
        
         const { token } = user;

         const response = await fetch(`${DELETE_CANDIDATE}${id}`, {
           method: "DELETE",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
        
        
        
        // Handle success (e.g., show a success message or redirect)
        console.log("Candidate deleted:", response.data);
        alert("Candidate deleted successfully!");
        
        
        // Optionally redirect to another page
        // history.push("/candidate");
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error("Error deleting candidate:", error);
        alert("Failed to delete candidate. Please try again later.");
      }
    }
  }



  return (
    <main id="maincontent" className="p-4 mt-14">
      <div className="bg-White py-2  px-3 rounded shadow-2">
        <div className="flex gap-1 items-center justify-between">
          <h1 className="text-base"> {details?.data?.jobPosiiton} </h1>
          <div className="flex gap-1 items-center justify-between">
            <Link to={`/edit_candidate/${id}`} className="text-blue-600 mx-2">
              <FaEdit />
            </Link>

            {/* <Link to="/candidate" className="text-blue-600 mx-2">
              <MdDelete className="text-red-600" />
            </Link> */}

            <Link
              to="/candidate"
              className="text-blue-600 mx-2"
              onClick={handleDelete}
            >
              <MdDelete className="text-red-600" />
            </Link>

            <Link to="/candidate" className="text-blue-600 mx-2">
              <IoMdArrowBack />
            </Link>
          </div>
        </div>
        {/* Details section */}
        <div className="grid gap-1 grid-cols-[120px,250px,1fr] my-3">
          <div className="w-[110px] h-[110px]">
            <img
              className="rounded-full"
              src={profilePicUrl}
              alt="Profile Pic"
            />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <h2 className="text-base leading-5">
              {details?.data?.jobPosiiton} <br />
              <small className="text-xs">
                <strong>Name:-</strong> {details?.data?.user_name}
              </small>
            </h2>
            <div className="flex gap-2">
              <h3 className="text-base leading-5">
                <small className="text-xs">
                  <strong>Email:-</strong> {details?.data?.email}
                </small>
              </h3>
            </div>
            <div className="flex gap-2">
              <h3 className="text-base leading-5">
                <small className="text-xs">
                  <strong>Status:-</strong> {details?.data?.status}
                </small>
              </h3>
            </div>
          </div>

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1 flex-col font-medium">
              <FaUserTie className="text-blue-600" />
              <span className="text-xs">Profession</span>
              <h4 className="text-base">{details?.data?.jobposition}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdWorkOutline className="text-blue-600" />
              <span className="text-xs">Experience</span>
              <h4 className="text-base">{details?.data?.experience}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaRing className="text-blue-600" />
              <span className="text-xs">Marital Status</span>
              <h4 className="text-base">{details?.data?.maritalStatus}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaGraduationCap className="text-blue-600" />
              <span className="text-xs">Education</span>
              <h4 className="text-base">{details?.data?.education}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaVenusMars className="text-blue-600" />
              <span className="text-xs">Gender</span>
              <h4 className="text-base">{details?.data?.gender}</h4>
            </div>
          </div>
        </div>

        <div className="h-10"></div>

        <div className="border-t border-gray-300 grid gap-1 grid-cols-[70%,1fr]">
          <div className="px-2">
            <h3 className="my-3 text-base">Description</h3>
            <p className="text-sm">{details?.data?.description}</p>
          </div>
          <div className="px-2 border-l border-gray-200">
            <div className="h-4"></div>

            <div className="flex gap-5 flex-wrap">
              <div className="flex gap-1 flex-col font-medium">
                <MdDateRange className="text-blue-600" />

                <span className="text-xs">Date Of Birth</span>
                <h4 className="text-base">{details?.data?.dob}</h4>
              </div>

              <div className="flex gap-1 flex-col font-medium">
                <a
                  href={resume}
                  download="resume.pdf"
                  className="flex gap-1 flex-col items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoDownload className="text-blue-600" />

                  <span className="text-xs">Resume Download</span>
                  <h4 className="text-base">
                    <AiTwotoneFilePdf className="text-red-600" />
                  </h4>
                </a>
              </div>
            </div>

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
              <div>
                {Languages && Languages.length > 0 ? (
                  Languages.map((lang, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                      {lang.name}
                    </span>
                  ))
                ) : (
                  <p>No Languages found</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-10"></div>

        <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white grid gap-4 grid-cols-[50%,50%]">
          <div className="px-2">
            <h3 className="my-3 text-lg font-semibold text-gray-700 border-b pb-2">
              Documents
            </h3>
            <div className="py-2 text-gray-800 font-medium">AADHAR CARD</div>
            <div className="py-2 text-gray-800 font-medium">PAN CARD</div>
            <div className="py-2 text-gray-800 font-medium">CIN</div>
            <div className="py-2 text-gray-800 font-medium">GST</div>
          </div>
          <div className="px-2">
            <h3 className="my-3 text-lg font-semibold text-gray-700 border-b pb-2">
              Details/Status
            </h3>
            <div className="py-2 text-gray-600">
              {details?.data?.aadharCardNumber || "Pending"}
            </div>
            <div className="py-2 text-gray-600">
              {details?.data?.panCardNumber || "Pending"}
            </div>
            <div className="py-2 text-gray-600">
              {details?.data?.cinNumber || "Pending"}
            </div>
            <div className="py-2 text-gray-600">
              {details?.data?.gstNumber || "Pending"}
            </div>
          </div>
        </div>

        
      </div>
    </main>
  );
};

export default LayoutHOC(CandidateDetails);
