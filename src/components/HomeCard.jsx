import { Link } from "react-router";
import { ImPriceTag } from "react-icons/im";
import { TbLocationFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

const HomeCard = ({ camp }) => {
  const {
    _id,
    camp_name,
    description,
    image,
    appointment_date,
    camp_fee,
    location,
    participants,
    professional_name,
  } = camp;
  return (
    <div className="card mx-auto my-3 w-[230px] bg-gray-100 dark:bg-gray-800 dynamic-gradient-border card-xs shadow-lg relative dynamic-gradient-border ">
      <div className="flex flex-col gap-y-1">
        <img
          src={image}
          className="h-[120px] relative z-[3] w-full border-rounded-match"
          alt=""
        />
        <div className="px-3 py-2">
          <h2 className="text-base font-semibold text-nowrap overflow-hidden">
            {camp_name}
          </h2>
          <p className="line-clamp-3 text-sm mt-2">{description}</p>
          <div className="border-b my-2"></div>
          <div className="flex flex-col text-[12px] gap-y-1">
            <div className="flex justify-between items-center font-bold">
              <div className="flex gap-2 items-center ">
                <span>
                  <ImPriceTag />
                </span>
                {camp_fee} TK
              </div>
              <div>
                <p className=" flex items-center gap-2">
                  <span>
                    <MdPeopleAlt />
                  </span>
                  {participants} Joined
                </p>
              </div>
            </div>
            <div className="border-b my-1"></div>
          </div>
          <div className="w-full flex justify-end">
            <button className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 my-2">
              <Link to={`/camp-details/${_id}`}>join Camp</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
