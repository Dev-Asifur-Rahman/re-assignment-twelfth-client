import { Link } from "react-router";

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
    <section className="p-0.5 w-4/5 transition-transform hover:scale-105 duration-200 rounded-[14px] bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <div className="rounded-xl shadow-md bg-white dark:bg-[#1d232a]   relative ">
        <img
          src={image}
          alt={camp_name}
          className="w-full rounded-t-xl lg:h-48 md:h-48 h-36 object-cover"
        />
        <div className="p-4 space-y-2">
          <h2
            title={camp_name}
            className="text-xl  font-semibold text-nowrap truncate overflow-hidden text-ellipsis "
          >
            {camp_name}
          </h2>
          <p className="text-sm ">
            <span className="font-semibold">Location:</span>
            {location}
          </p>
          <p className="text-sm ">
            <span className="font-semibold">Doctor:</span>
            {professional_name}
          </p>
          <p className="text-sm ">
            <span className="font-semibold">Participants:</span> {participants}
          </p>
          <Link to={`/camp-details/${_id}`}>
            <button className="mt-4 font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-violet-500 to-fuchsia-500">
              Details →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampCard;
