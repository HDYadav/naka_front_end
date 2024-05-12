import React from "react";
import LayoutHOC from "../LayoutHOC";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { PiMoney } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";

const CandidateDetails = () => {
  return (
    <main id="maincontent" className="p-4 mt-14">
      <div className="bg-White py-2  px-3 rounded shadow-2">
        <div className="flex gap-1 items-center justify-between">
          <h1 className="text-base">Marketing Manager</h1>
          <div className="flex gap-1 items-center justify-between">
            <BiEdit className="text-xl" />
            <MdDeleteOutline className="text-xl" />
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
              Marketing Manager <br />{" "}
              <small className="text-xs">Templatecookie · Full Time</small>
            </h2>
            <div className="flex gap-2">
              <PiMoney className="text-2xl" />
              <h3 className="text-base leading-5">
                3,000 - 5,000 USD
                <br /> <small className="text-xs">Monthly</small>
              </h3>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
            <div className="flex gap-1 flex-col font-medium">
              <BsGraphUpArrow className="text-blue-600" />
              <span className="text-xs">Category</span>
              <h4 className="text-base">Design/Creative</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(CandidateDetails);
