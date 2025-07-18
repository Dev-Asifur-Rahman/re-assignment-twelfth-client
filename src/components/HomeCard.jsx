import { Link } from "react-router";

const HomeCard = ({ camp }) => {
  const {
    _id,
    camp_name,
    image,
    appointment_date,
    camp_fee,
    location,
    participants,
    professional_name,
  } = camp;
  return (
    <div className="card mx-auto my-3 w-[230px] bg-white dark:bg-[#1d232a] dynamic-gradient-border card-xs shadow-lg relative dynamic-gradient-border ">
      <div className="flex flex-col gap-y-1">
        <img
          src={image}
          className="h-[120px] w-full border-rounded-match"
          alt=""
        />
        <div className="px-3 py-2">
          <h2 className="text-[16px] font-semibold text-nowrap overflow-hidden">
            {camp_name}
          </h2>
          <div className="flex flex-col  gap-y-1">
            <p className="text-[12px]">
              Fee: <span className="font-semibold">{camp_fee} TK</span>
            </p>
            <p className="text-[12px]">
              Date: <span className="font-semibold">{appointment_date}</span>
            </p>
            <p className="text-[12px] text-nowrap overflow-hidden">
              Professional:
              <span className="font-semibold text-nowrap">
                {professional_name}
              </span>
            </p>
            <p className="text-[12px]">
              Location: <span className="font-semibold">{location}</span>
            </p>
            <p className="text-[12px]">
              Participants:{" "}
              <span className="font-semibold">{participants}</span>
            </p>
          </div>
          <div className="w-full flex justify-end">
            <button className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500">
              <Link to={`/camp-details/${_id}`}>join Camp</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
