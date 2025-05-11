import React from "react";

const NoDataUI = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-6 max-w-md w-full">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No data found</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          There is currently no data to display. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default NoDataUI;
