import React from "react";

const CommonHeading = ({ heading, description }) => {
  return (
    <div className="w-full my-6 lg:py-2 py-1 bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <p className="text-center text-white lg:text-4xl  lg:font-bold font-semibold text-2xl md:text-3xl lg:my-2 my-1">
        Heading
      </p>
      <p className="text-center text-white lg:text-lg text-base lg:font-medium font-base">
        Hi i am Asif
      </p>
    </div>
  );
};

export default CommonHeading;
