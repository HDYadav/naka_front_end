import React from 'react'

function Shimmer() {
  return (
    <div className="p-8 ml-44 overflow-x-auto">
      <div className="animate-pulse">
        <div className="flex justify-center items-center bg-gray-200 px-4 py-2 w-40"></div>
        <div className="flex justify-center items-center bg-gray-200 px-4 py-2 w-64"></div>
      </div>
    </div>
  );
}

export default Shimmer