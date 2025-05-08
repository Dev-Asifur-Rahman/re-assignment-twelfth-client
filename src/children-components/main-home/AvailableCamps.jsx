import React, { useState } from "react";
import useAllCamp from "../../hook/useAllCamp";
import CampCard from "../../components/CampCard";

const AvailableCamps = () => {
  const { all_camps, isPending, refetch } = useAllCamp();
  const [currentPage, setCurrentPage] = useState(1);
  const campsPerPage = 6;

  const totalPages = Math.ceil(all_camps.length / campsPerPage);
  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = all_camps.slice(indexOfFirstCamp, indexOfLastCamp);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageButtons = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first
      pageButtons.push(
        <button
          key={1}
          className={`join-item btn ${currentPage === 1 ? "btn-active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pageButtons.push(
          <span key="start-ellipsis" className="join-item btn btn-disabled">
            ...
          </span>
        );
      }

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          pageButtons.push(
            <button
              key={i}
              className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pageButtons.push(
          <span key="end-ellipsis" className="join-item btn btn-disabled">
            ...
          </span>
        );
      }

      // Always show last
      pageButtons.push(
        <button
          key={totalPages}
          className={`join-item btn ${currentPage === totalPages ? "btn-active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      {/* Search Bar (no functionality) */}
      <div className="w-full flex justify-center my-4">
        <label className="input w-fit flex items-center gap-2 border px-3 py-2 rounded">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="Search" className="outline-none" />
        </label>
      </div>

      {/* Card Grid */}
      <div className="py-10 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCamps.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="join flex justify-center mt-10 flex-wrap gap-1">
          <button
            className="join-item btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          {renderPageNumbers()}

          <button
            className="join-item btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default AvailableCamps;
