import { useContext } from "react";
import { Context } from "../js/context";

const CommonHeading = ({ heading, description }) => {
  const {mode} = useContext(Context)
  return (
    <div className={` w-full my-20 lg:py-2 py-1`}>
      <p className={`text-center lg:text-4xl gradient-text lg:font-bold font-semibold text-2xl md:text-3xl lg:my-2 my-1`}>
        {heading}
      </p>
      <p className={` text-center  lg:text-lg text-base lg:font-medium font-base`}>
        {description}
      </p>
    </div>
  );
};

export default CommonHeading;
