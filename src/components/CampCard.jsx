import { Link } from "react-router";
import { TbLocationFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

const CampCard = ({ camp }) => {
  const {
    _id,
    camp_name,
    image,
    camp_fee,
    location,
    professional_name,
    participants,
    description,
  } = camp;
  return (
    <section className="p-0.5 lg:w-4/6 w-4/5 transition-transform hover:scale-105 duration-200 rounded-[14px] bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <div className="rounded-xl shadow-md bg-white dark:bg-[#1d232a]   relative ">
        <img
          src={image}
          alt={camp_name}
          className="w-full rounded-t-xl lg:h-36 md:h-36 h-36 object-cover"
        />
        <div className="px-4 py-2 space-y-2">
          <h2
            title={camp_name}
            className="text-base  font-semibold text-nowrap truncate overflow-hidden text-ellipsis "
          >
            {camp_name}
          </h2>
          <p className="text-sm flex gap-0.5 items-center">
            <span className="font-semibold"> <TbLocationFilled /> </span>
            {location}
          </p>
          <p className="text-sm flex gap-0.5 items-center">
            <span className="font-semibold"><FaUserDoctor /> </span>
            {professional_name}
          </p>
          <p className="text-sm flex gap-0.5 items-center">
            <span className="font-semibold"><MdPeopleAlt /></span> {participants} Registered
          </p>
          <Link to={`/camp-details/${_id}`}>
            <button className=" font-semibold cursor-pointer text-transparent bg-clip-text bg-gradient-to-bl from-violet-500 to-fuchsia-500">
              Details →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampCard;
