import React from "react";

const OTPVerificationFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      <option value="verified">Verified</option>
      <option value="not_verified">Not Verified</option>
    </select>
  );
};

export default OTPVerificationFilter;
