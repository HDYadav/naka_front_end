import React, { useState, useEffect } from "react";
import LayoutHOC from "./LayoutHOC";
import useAllUserData from "../hooks/useAllUserData";
import Shimmer from "./Shimmer";

function Users() {
  const usersPerPage = 5; // Number of users to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State to manage filtered users
  const users = useAllUserData();

  useEffect(() => {
    if (users) {
      setFilteredUsers(users); // Initialize filtered users with all users when data is loaded
    }
  }, [users]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on search query
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Calculate the index of the first and last user to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8 ml-44 overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded"
        />
      </div>
      {users ? (
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.mobile}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Shimmer />
      )}
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className="mx-1 px-3 py-1 bg-blue-500 text-white rounded"
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default LayoutHOC(Users);
