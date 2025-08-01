import React, { useState, useEffect } from "react";
import useAllCamp from "../../hook/useAllCamp";
import CampCard from "../../components/CampCard";

const AvailableCamps = () => {
  const { all_camps, isPending } = useAllCamp();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const campsPerPage = 6;

  const filteredCamps = all_camps
    .filter((camp) => {
      const query = searchQuery.toLowerCase();
      return (
        camp.camp_name.toLowerCase().includes(query) ||
        camp.location.toLowerCase().includes(query) ||
        camp.professional_name.toLowerCase().includes(query) ||
        camp.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOption === "mostRegistered") {
        return b.participants - a.participants;
      }
      if (sortOption === "campFees") {
        return a.camp_fee - b.camp_fee;
      }
      if (sortOption === "alphabetical") {
        return a.camp_name.localeCompare(b.camp_name);
      }
      return 0;
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredCamps.length / campsPerPage);
  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);

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
              className={`join-item btn ${
                currentPage === i ? "btn-active" : ""
              }`}
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

      pageButtons.push(
        <button
          key={totalPages}
          className={`join-item btn ${
            currentPage === totalPages ? "btn-active" : ""
          }`}
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
      {/* data query div  */}
      <div className="w-full flex flex-col  md:flex-row items-center justify-between gap-4 px-4 my-4">
        {/* Search Bar */}
        <label className="input lg:w-[250px] w-full md:w-[200px] flex items-center gap-2  px-3 py-2 rounded focus-within:ring-0 focus-within:outline-none ">
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
          <input
            type="search"
            placeholder="Search camps..."
            className="w-full "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select lg:w-[250px] w-full md:w-[200px] select-bordered focus:outline-none
          "
        >
          <option value="default">Sort By: Default</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="campFees">Camp Fees (Low to High)</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* Camp Cards */}
      <div className="py-10 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {currentCamps.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
          ))}
        </div>

        {/* Pagination */}
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
