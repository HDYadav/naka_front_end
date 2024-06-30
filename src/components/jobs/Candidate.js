import React, { useState, useMemo } from "react";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useCandidate from "../../hooks/useCandidate";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
} from "react-table";
import OTPStatus from "./OTPStatus";
import { ACCOUNT_STATUS } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";

const Candidate = () => {
  const positions = useCandidate();
  const [successMessage, setSuccessMessage] = useState("");

 
  const SliderRounded = ({ value, onToggle, id }) => {
    const user = useRequireAuth();

    const [isActive, setIsActive] = useState(value === "activated");

    console.log();

    const handleClick = async () => {
      const newValue = !isActive;
      setIsActive(newValue);
      if (onToggle) {
        onToggle(newValue ? "activated" : "deactivated");
      }

      try {
        const authToken = user.token;
        const formData = new FormData();
        formData.append("status", newValue ? 1 : 0);

        const response = await fetch(`${ACCOUNT_STATUS}${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`cursor-pointer rounded-full w-12 h-6 flex items-center justify-${
          isActive ? "start" : "end"
        } p-1 bg-${isActive ? "green" : "gray"}-300`}
      >
        <div className="rounded-full w-4 h-4 bg-white" />
      </div>
    );
  };


  // Dropdown filter for the "Account Status" column
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: "Candidate Info",
        accessor: "candidateInfo",
        Cell: ({ cell: { row } }) => {
          const { profilePic, email, name } = row.original;
          const defaultImage = "path/to/default/image.png"; // Replace this with the path to your default image

          return (
            <div className="flex items-center">
              <img
                src={profilePic || defaultImage}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-500">{email}</div>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Role/Position",
        accessor: "jobposition",
        sortType: "alphanumeric",
      },
      {
        Header: "Applied Jobs",
        accessor: "jobsApplied",
        sortType: "alphanumeric",
      },
      {
        Header: "Account Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: ({ row }) => (
          <SliderRounded
            value={row.original.status}
            onToggle={() => {}}
            id={row.original.id}
          />
        ),
      },
      {
        Header: "OTP Verification",
        accessor: "otp_verified",
        sortType: "alphanumeric",
        Cell: ({ row }) => <OTPStatus value={row.original.otp_verified} />,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Joining Date",
        accessor: "created_at",
        sortType: "alphanumeric",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex items-center space-x-4">
            <Link
              to={{ pathname: `/view_profile/${row.values.id}` }}
              className="text-blue-500 hover:underline"
            >
              View Profile
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => positions || [], [positions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const handleCreateSuccess = () => {
    setSuccessMessage("Job position created successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <main id="maincontent">
      <div className="p-4 mt-14">
        <div className="flex flex-col bg-white p-4">
          <div className="flex justify-between items-center">
            <h5 className="text-203C50 font-Vietnam text-[28px] font-medium">
              Candidate
            </h5>

            <div className="flex items-center">
              <Link
                to="/create_candidate"
                className="bg-1D4469 rounded-sm text-white rounded p-2 px-5 text-[14px]"
                type="button"
                onClick={handleCreateSuccess}
              >
                + Create
              </Link>
              <i className="bi bi-three-dots-vertical text-2xl text-535252"></i>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-200 text-green-800 p-3 mt-4 mb-4 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="my-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
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
            <table
              className="bg-white min-w-full border border-neutral-200 text-center text-sm text-surface text-gray-500 font-poppins"
              {...getTableProps()}
            >
              <thead className="border-neutral-200 border bg-gray-200">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="font-medium px-4 py-2 text-left border text-sm text-gray-700 bg-gray-200"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="border" {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      className="border border-neutral-200"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => (
                        <td
                          className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination mt-4">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="mr-2 p-2 bg-gray-200 rounded"
              >
                Previous
              </button>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="ml-2 p-2 bg-gray-200 rounded"
              >
                Next
              </button>
              <span className="ml-4">
                Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  className="p-2 border rounded"
                  style={{ width: "50px" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LayoutHOC(Candidate);
