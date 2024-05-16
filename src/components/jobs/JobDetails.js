import React from "react";
import LayoutHOC from "../LayoutHOC";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { Link } from "react-router-dom";


const JobDetails = (props) => {


//const { job } = props.location.state || {}; 
  //console.log(props, 555);

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
              <FaMoneyCheck className="text-2xl" />
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
        <div className="border-t border-gray-300 grid gap-1 grid-cols-[70%,1fr]">
          <div className="px-2">
            <h3 className="my-3 text-base">Description</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              facere adipisci debitis? Sed, deserunt nisi dolorum neque fugit
              sunt tenetur quam recusandae aspernatur ad vel ullam quas nobis
              labore, aperiam, consequuntur voluptatibus totam ex soluta? Beatae
              commodi cupiditate atque blanditiis quia, facere assumenda sed
              animi ratione eum dolore incidunt inventore. Enim eligendi
              cupiditate nobis? Veniam odit temporibus inventore assumenda nihil
              tempore doloremque iste ipsum asperiores, beatae molestias,
              ratione fugit. Vitae, doloribus commodi non adipisci ducimus ad
              praesentium aut saepe totam? Est dolores iusto consectetur numquam
              laborum nobis, neque cupiditate velit vel nesciunt distinctio
              quaerat placeat delectus recusandae nisi quae, et necessitatibus
              eaque quisquam porro tenetur voluptates explicabo. Cumque impedit
              id amet nobis, odio laudantium incidunt minus harum expedita
              ratione quisquam, aut sint aspernatur vel magnam rem. Omnis
              perferendis placeat aliquam consequuntur velit cupiditate beatae
              facere recusandae, dignissimos cumque voluptatum error doloremque
              animi eos deserunt odio maxime illo tempore laboriosam odit iure,
              dolore quia a. Perspiciatis dignissimos, atque excepturi nemo
              dolor repellat error quaerat neque doloremque aut iure! Vel
              architecto ut, unde alias excepturi expedita nostrum quos
              laboriosam perspiciatis odio, accusantium officia numquam.
              Voluptatibus pariatur sed at dolores facere dicta repudiandae
              amet, dolor doloremque nam iste quae doloribus ex, accusamus
              consectetur, cum architecto exercitationem. Vero quae mollitia,
              dolore,  
            </p>
          </div>
          <div className="px-2 border-l border-gray-200">
            {/* Categories */}
            <div className="my-3">
              <h3 className="text-base mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">React</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">.NET Framework</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Javascript</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Javascript</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">.NET Framework</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">React</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">.NET Framework</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">React</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Javascript</span>
              </div>
            </div>
            <div className="my-3">
              <h3 className="text-base mb-2">Language</h3>
              <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">English</span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Hindi</span>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(JobDetails);
