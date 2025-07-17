import { Link } from "react-router";

const CampCard = ({ camp }) => {
  const {
    _id,
    camp_name,
    image,
    camp_fee,
    appointment_date,
    location,
    professional_name,
    participants,
    description,
  } = camp;
  return (
    <div className=" rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-200">
      <img
        src={image}
        alt={camp_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 title={camp_name} className="text-xl font-semibold text-nowrap truncate overflow-hidden text-ellipsis ">
          {camp_name}
        </h2>
        <p className="text-sm "><span className="font-semibold">Date : </span> {appointment_date}</p>
        <p className="text-sm ">
          <span className="font-semibold">Location:</span>{location}
        </p>
        <p className="text-sm ">
          <span className="font-semibold">Doctor:</span>{professional_name}
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
  );
};

export default CampCard;
