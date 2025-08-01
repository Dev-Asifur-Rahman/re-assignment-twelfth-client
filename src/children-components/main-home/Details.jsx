import React, { useContext, useState } from "react";
import useCampDetails from "../../hook/useCampDetails";
import LottieSpinner from "../../components/LottieSpinner";
import { useParams } from "react-router";
import { Context } from "../../js/context";
import { swalError, swalSuccess, toastError } from "../../js/utils";
import { ApiInstance } from "../../js/api-instance";
import useAllCamp from "../../hook/useAllCamp";
import { ImPriceTag } from "react-icons/im";
import { TbLocationFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { MdDateRange } from "react-icons/md";


const Details = () => {
  const { refetch } = useAllCamp();
  const { user, role } = useContext(Context);
  const { campId } = useParams();
  const { camp, isLoading, campRefetch } = useCampDetails(campId);
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

  const closeModal = () => {
    document.getElementById("my_modal_5").close();
  };

  const [loading, setLoading] = useState(false);
  const registerForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target;
    const age = parseInt(target.age.value);
    const number = target.phone.value;
    const isValid = /^\d{11}$/.test(number.trim());

    if (age < 1 || age > 120) {
      toastError("Invalid Age");
      setLoading(false);
      return;
    } else if (!isValid) {
      toastError("Invalid Number");
      setLoading(false);
      return;
    } else {
      const registration_object = {
        campId: _id,
        camp_name,
        camp_fee,
        location,
        professional_name,
        patient: user?.displayName,
        email: user?.email,
        age,
        number,
        payment_status: false,
        confirmation_status: false,
      };

      ApiInstance.post("/register-campaign", registration_object)
        .then((res) => {
          setLoading(false);
          closeModal();
          setTimeout(() => {
            if (res.data.acknowledged) {
              swalSuccess("Registered Successfully");
              refetch();
              campRefetch();
              target.reset();
            } else {
              swalError("Already Registered", "You Have Registered Once");
            }
          }, 300);
        })
        .catch((error) => {
          setLoading(false);
          closeModal();
          setTimeout(() => {
            swalError("Registration Failed");
          }, 300);
        });
    }
  };

  if (!isLoading) {
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
      <div className="w-full py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className=" rounded-2xl shadow-lg overflow-hidden md:flex">
            <img
              src={image}
              alt="Camp Name"
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-6 space-y-4 md:w-1/2">
              <h1 className="text-3xl font-bold gradient-text">   {camp_name} </h1>
              <p className="">{description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <div className="flex gap-2 items-center">
                  <span><ImPriceTag /> </span> {camp_fee} TK
                </div>
                <div className="flex gap-2 items-center">
                  <span><MdDateRange /></span>
                  {appointment_date}
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <span><FaUserDoctor /></span>
                  <p>{professional_name}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className=""><TbLocationFilled /></span> {location}
                </div>

                <div>
                  <p className=" flex items-center gap-2">
                    <span><MdPeopleAlt /></span> {participants} Registered
                  </p>
                </div>
              </div>

              <button
                className="mt-6 w-full md:w-auto px-6 py-2 bg-gradient-to-bl from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-medium rounded-xl transition-all duration-200 shadow-md"
                onClick={() => {
                  if (role) {
                    return toastError("Admin can't register");
                  }
                  document.getElementById("my_modal_5").showModal();
                }}
              >
                Join Camp
              </button>
            </div>
          </div>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Join Camp Registration</h3>

              <form onSubmit={registerForm} className="space-y-4">
                {/* Read-only fields */}
                <div>
                  <label className="block font-semibold">Camp Name</label>
                  <input
                    type="text"
                    value={camp_name}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Camp Fees</label>
                  <input
                    type="text"
                    value={camp_fee}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Location</label>
                  <input
                    type="text"
                    value={location}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Healthcare Professional Name
                  </label>
                  <input
                    type="text"
                    value={professional_name}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Logged in user info */}
                <div>
                  <label className="block font-semibold">
                    Participant Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Participant Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* User input fields */}
                <div>
                  <label className="block font-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Gender</label>
                  <select
                    name="gender"
                    required
                    defaultValue={"Other"}
                    className="select select-bordered w-full"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 "
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-sm"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    );
  } else {
    return <LottieSpinner></LottieSpinner>;
  }
};

export default Details;
