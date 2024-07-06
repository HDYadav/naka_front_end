import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import logoicon from "../assets/images/glogo.webp";

function Leftmenu(props) {
  const threedotmenu = useRef(null);
  const SideMenuRef = useRef(null);

  const user = useSelector((store) => store.user);
  const [openMenus, setOpenMenus] = useState([]);
  const [asideWidth, setAsideWidth] = useState(null);
  const [sideBarColl, setSideBarColl] = useState(false);

  const handleToggleMenu = (menuIndex) => {
    if (openMenus.includes(menuIndex)) {
      setOpenMenus(openMenus.filter((index) => index !== menuIndex));
    } else {
      setOpenMenus([...openMenus, menuIndex]);
    }
  };

  const isMenuOpen = (menuIndex) => {
    return openMenus.includes(menuIndex);
  };

  useEffect(() => {
    if (SideMenuRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const newWidth = entries[0].contentRect.width;
        setAsideWidth(newWidth);
      });
      resizeObserver.observe(SideMenuRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [SideMenuRef]);

  useEffect(() => {
    const mainContentElement = document.getElementById("maincontent");
    if (asideWidth && mainContentElement) {
      mainContentElement.classList.add(`ml-[${asideWidth}px]`);
    }

    return () => {
      if (asideWidth && mainContentElement) {
        mainContentElement.classList.remove(`ml-[${asideWidth}px]`);
      }
    };
  }, [asideWidth]);

  const Expandside = () => {
    setSideBarColl(!sideBarColl);
  };

  return (
    <Fragment>
      <button
        type="button"
        className={`fixed left-[${asideWidth + 20}px] top-[20px] z-[99]`}
        onClick={Expandside}
      >
        <i className="bi bi-list text-2xl text-1D4469 "></i>
      </button>

      <div
        ref={threedotmenu}
        className={`p-5 rounded shadow-6 bg-F8FAFB fixed left-[${asideWidth}px] top-[40px] z-[999] hidden`}
      >
        <ul>
          <li className="pb-1">
            <i className="bi bi-amazon me-4"></i>
            <Link to="/add_company" className="text-6B8AA8 text-lg pe-auto">
              Naka
            </Link>
          </li>
        </ul>
      </div>

      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        ref={SideMenuRef}
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-50 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-zinc-600  ${
          sideBarColl ? "w-16 sidebaraside" : "w-2/12"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto sidebarscroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <a
            href="#"
            className={`flex items-center ${
              sideBarColl ? "justify-center" : "justify-between"
            }  my-5`}
          >
            <img
              className="h-6 me-3 sm:h-7"
              src={sideBarColl ? logoicon : logo}
              alt="Logo"
            />
          </a>
          <ul className={`space-y-2 font-extralight `}>
            <li className="parentmenu">
              <a
                href="#"
                className="sidebarmenutab flex items-center p-2 text-CCE6FF rounded-lg hover:bg-sky-600 group"
                onClick={() => handleToggleMenu(0)}
              >
                <i className="bi bi-speedometer2 text-xl text-CCE6FF"></i>
                <span className={`ms-3 parenttext`}>Dashboard</span>
              </a>
            </li>
            <li className="menubottomborder parentmenu pb-2">
              <button
                type="button"
                className="sidebarmenutab flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg group hover:bg-sky-600"
                aria-controls="sales-menu"
                data-collapse-toggle="sales-menu"
                onClick={() => handleToggleMenu(1)}
              >
                <i className="bi bi-gear text-lg" text-CCE6FF></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap parenttext">
                  Attributes
                </span>
                <svg
                  className="w-3 h-3 sidedownarrow"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokelineap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="sales-menu"
                className={`py-2 space-y-2 submenuchildtext ${
                  isMenuOpen(1) ? "" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to={"/state"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    State
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/city"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    City
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/salary_type"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Salary Type
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/industry_type"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Industry Type
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/jobs_position"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Job Position
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/employment_type"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Employment Type
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/skills"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/experiance"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/education"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Education
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/work_place"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    WorkPlace
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/promote"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Promote
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menubottomborder parentmenu pb-2">
              <button
                type="button"
                className="sidebarmenutab flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg group hover:bg-sky-600"
                aria-controls="account-menu"
                data-collapse-toggle="account-menu"
                onClick={() => handleToggleMenu(2)}
              >
                <i className="bi bi-piggy-bank text-xl text-CCE6FF"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap parenttext">
                  Users
                </span>
                <svg
                  className="w-3 h-3 sidedownarrow"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="account-menu"
                className={`py-2 space-y-2 submenuchildtext ${
                  isMenuOpen(2) ? "" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to={"/candidate"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Candidate
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/employer"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Employer
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menubottomborder parentmenu pb-2">
              <button
                type="button"
                className="sidebarmenutab flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg group hover:bg-sky-600"
                aria-controls="payroll-menu"
                data-collapse-toggle="payroll-menu"
                onClick={() => handleToggleMenu(5)}
              >
                <i className="bi bi-person-raised-hand text-xl text-CCE6FF"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap parenttext">
                  Jobs
                </span>
                <svg
                  className="w-3 h-3 sidedownarrow"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                className={`py-2 space-y-2 submenuchildtext ${
                  isMenuOpen(5) ? "" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to={"/jobs_list"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Jobs List
                  </Link>

                  <li>
                    <Link
                      to={"/applyed_job"}
                      className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                    >
                      Applyed Job
                    </Link>
                  </li>
                </li>
              </ul>
            </li>

            <li className="menubottomborder parentmenu pb-2">
              <button
                type="button"
                className="sidebarmenutab flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg group hover:bg-sky-600"
                aria-controls="account-menu"
                data-collapse-toggle="account-menu"
                onClick={() => handleToggleMenu(6)}
              >
                <i className="bi bi-piggy-bank text-xl text-CCE6FF"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap parenttext">
                  Settings
                </span>
                <svg
                  className="w-3 h-3 sidedownarrow"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="account-menu"
                className={`py-2 space-y-2 submenuchildtext ${
                  isMenuOpen(6) ? "" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to={"/pages"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Pages
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/edit_email_template/1"}
                    className="flex items-center w-full p-2 text-CCE6FF transition duration-75 rounded-lg pl-11 group hover:bg-sky-600"
                  >
                    Email Template
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </Fragment>
  );
}

export default Leftmenu;
