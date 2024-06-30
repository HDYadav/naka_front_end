import React, { useState, useMemo } from "react";
import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import useJobsList from "../../hooks/useJobsList";
import Shimmer from "../Shimmer";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy, // Import useSortBy hook
} from "react-table";
import { useSelector } from "react-redux";
import { DELETE_JOB } from "../../utils/constants";
 

const JobsList = () => {
  
  const positions = useJobsList(); 

  const [successMessage, setSuccessMessage] = useState("");

  const user = useSelector((state) => state.user);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

   
    if (confirmDelete) {
      try {
        const { token } = user;

       
        const response = await fetch(`${DELETE_JOB}${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Handle success (e.g., show a success message or refresh the data)
          alert("Record deleted successfully!");
          window.location.reload(); // Refresh the page or fetch the data again
        } else {
          // Handle errors (e.g., show an error message)
          alert("Failed to delete record. Please try again later.");
        }
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error("Error deleting record:", error);
        alert("Failed to delete record. Please try again later.");
      }
    }
  };


    const determineStatus = (deadline) => {
      const today = new Date();
      const deadlineDate = new Date(deadline);
      return deadlineDate > today ? "Published" : "Expired";
   };
  

 
  const columns = useMemo(
    () => [
      {
        Header: "Job",
        accessor: "title",
        sortType: "alphanumeric", // Set sortType for sorting
      },
      {
        Header: "Position",
        accessor: "jobPosiiton",
        sortType: "alphanumeric", // Set sortType for sorting
      },

      {
        Header: "Salary",
        accessor: "salaryRange",
        sortType: (rowA, rowB, columnId, desc) => {
          // Extracting the numerical values for sorting
          const minSalaryA = parseFloat(
            rowA.original.minSalary.replace("₹", "").replace(/,/g, "")
          );
          const maxSalaryA = parseFloat(
            rowA.original.maxSalary.replace("₹", "").replace(/,/g, "")
          );
          const minSalaryB = parseFloat(
            rowB.original.minSalary.replace("₹", "").replace(/,/g, "")
          );
          const maxSalaryB = parseFloat(
            rowB.original.maxSalary.replace("₹", "").replace(/,/g, "")
          );

          const rangeA = minSalaryA + maxSalaryA;
          const rangeB = minSalaryB + maxSalaryB;

          return rangeA - rangeB;
        },
        Cell: ({ row }) => {
          const minSalary = row.original.minSalary;
          const maxSalary = row.original.maxSalary;
          return `₹ ${minSalary} - ₹ ${maxSalary}`;
        },
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        sortType: "alphanumeric", // Set sortType for sorting
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const status = determineStatus(row.original.deadline);
          return (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`published-${row.values.id}`}
                  name={`status-${row.values.id}`}
                  value="published"
                  checked={status === "Published"}
                  readOnly
                  className="mr-2"
                />
                <label
                  htmlFor={`published-${row.values.id}`}
                  className="text-gray-700"
                >
                  Published
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`expired-${row.values.id}`}
                  name={`status-${row.values.id}`}
                  value="expired"
                  checked={status === "Expired"}
                  readOnly
                  className="mr-2"
                />
                <label
                  htmlFor={`expired-${row.values.id}`}
                  className="text-gray-700"
                >
                  Expired
                </label>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex items-center space-x-4">
            <Link
              to={`/edit_job/${row.values.id}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>

            <Link
              to={{ pathname: `/job_details/${row.values.id}` }}
              className="text-blue-500 hover:underline"
            >
              Details
            </Link>
            <button
              onClick={() => handleDelete(row.values.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => positions?.data || [], [positions]);

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
    useSortBy, // Add useSortBy hook
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  // Example function to simulate a success message after creating a new job position
  const handleCreateSuccess = () => {
    setSuccessMessage("Job position created successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
  };

  return (
    <main id="maincontent">
      <div className="p-4 mt-14">
        <div className="flex flex-col bg-white p-4">
          <div className="flex justify-between items-center">
            <h5 className="text-203C50 font-Vietnam text-[28px] font-medium">
              jobs List
            </h5>
            <div className="flex items-center">
              <Link
                to="/create_job"
                className="bg-1D4469 rounded-sm text-white rounded p-2 px-5 text-[14px]"
                type="button"
                onClick={handleCreateSuccess} // Trigger success message on button click
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
                        )} // Add getSortByToggleProps
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

export default LayoutHOC(JobsList);
