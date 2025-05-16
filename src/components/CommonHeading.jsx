

const CommonHeading = ({ heading, description }) => {
  return (
    <div className="w-full mb-6 lg:py-2 py-1 bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <p className="text-center text-white lg:text-4xl  lg:font-bold font-semibold text-2xl md:text-3xl lg:my-2 my-1">
        {heading}
      </p>
      <p className="text-center text-white lg:text-lg text-base lg:font-medium font-base">
        {description}
      </p>
    </div>
  );
};

export default CommonHeading;
