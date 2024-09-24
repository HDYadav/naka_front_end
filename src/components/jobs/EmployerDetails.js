import React from "react";
import LayoutHOC from "../LayoutHOC";
import { useParams } from "react-router-dom"; 
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { MdOutlineViewCompactAlt } from "react-icons/md"; 
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom"; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DELETE_CANDIDATE, PROFILE_PIC_URL } from "../../utils/constants";
import { AiTwotoneFilePdf } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { GoDownload } from "react-icons/go"; 
import { useSelector } from "react-redux";
import useEmployerDetails from "../../hooks/useEmployerDetails";
 
import EmpJob from "./EmpJob";

const EmployerDetails = () => {
    
  const { id } = useParams();
  const details = useEmployerDetails(id);
  const user = useSelector((state) => state.user);  
 
  
  const profilePicUrl = PROFILE_PIC_URL + details?.companyLogo;
  const resume = PROFILE_PIC_URL + details?.resume;

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
  };

  return (
    <main id="maincontent" className="p-4 mt-14">
      <div className="bg-White py-2  px-3 rounded shadow-2">
        <div className="flex gap-1 items-center justify-between">
          <h1 className="text-base"> {details?.jobPosiiton} </h1>
          <div className="flex gap-1 items-center justify-between">
            <Link to={`/edit_employer/${id}`} className="text-blue-600 mx-2">
              <FaEdit />
            </Link>

           

            <Link
              to="/employer"
              className="text-blue-600 mx-2"
              onClick={handleDelete}
            >
              <MdDelete className="text-red-600" />
            </Link>

            <Link to="/employer" className="text-blue-600 mx-2">
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
              {details?.jobPosiiton} <br />
              <small className="text-xs">
                <strong>Name:-</strong> {details?.company_name}
              </small>
            </h2>
            <div className="flex gap-2">
              <h3 className="text-base leading-5">
                <small className="text-xs">
                  <strong>Email:-</strong> {details?.email}
                </small>
              </h3>
            </div>
            <div className="flex gap-2">
              <h3 className="text-base leading-5">
                <small className="text-xs">
                  <strong>Status:-</strong> {details?.status}
                </small>
              </h3>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineRealEstateAgent className="text-blue-600" />

              <span className="text-xs">Industry Type</span>
              <h4 className="text-base">{details?.industry_type}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <FaCity className="text-blue-600" />

              <span className="text-xs">Team Size</span>
              <h4 className="text-base">{details?.team_size}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineViewCompactAlt className="text-blue-600" />

              <span className="text-xs">Phone</span>
              <h4 className="text-base">{details?.mobile}</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <MdOutlineViewCompactAlt className="text-blue-600" />

              <span className="text-xs">Contact Email</span>
              <h4 className="text-base">{details?.email}</h4>
            </div>
          </div>
        </div>

        <div className="h-20"></div>

        <div className="border-t border-gray-300 grid gap-1 grid-cols-[70%,1fr]">
          <div className="px-2">
            <h3 className="my-3 text-base">About</h3>
            <p className="text-sm">{details?.about}</p>
          </div>
          <div className="px-2 border-l border-gray-200">
            <div className="h-4"></div>

            <div className="flex gap-5 flex-wrap">
              <div className="flex gap-1 flex-col font-medium">
                <MdDateRange className="text-blue-600" />

                <span className="text-xs">Establishment Date</span>
                <h4 className="text-base">{details?.establishmentYear}</h4>
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

                  <span className="text-xs">Documents</span>
                  <h4 className="text-base">
                    <AiTwotoneFilePdf className="text-red-600" />
                  </h4>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>

        <div className="border-t border-gray-300 grid gap-1 grid-cols-[90%,1fr]">
          {/* <EmpJob empData={{ empId: details?.id }} /> */}

          <EmpJob empData={{ empId:id }} />
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(EmployerDetails);
