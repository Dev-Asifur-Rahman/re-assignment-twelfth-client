import React, { useContext } from "react";
import { Context } from "../../../js/context";

const ParticipantProfile = () => {
  const { user, role } = useContext(Context);
  return (
    <div className="min-h-screen bg-gradient-to-bl from-violet-500 to-fuchsia-500 p-8 flex items-center justify-center">
      {/* Profile Section with Glass Effect */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-lg w-full border border-white/20">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          {/* Gradient Text for Name */}
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {user?.displayName}
          </h1>

          {/* Role (User/Admin) */}
          <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
            <p>
              Role:{" "}
              <span className="text-violet-600">{!role && "Participant"}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-medium text-violet-600">
              Email
            </h3>
            <p className="text-sm sm:text-lg text-gray-700">{user?.email}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-medium text-violet-600">
              Phone
            </h3>
            <p className="text-sm sm:text-lg text-gray-700">
              {user?.phoneNumber ? user?.phoneNumber : "N/A"}
            </p>
          </div>

          <button  onClick={() => document.getElementById("my_modal_1").showModal()} className="mt-6 w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition">
            Update Profile
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ParticipantProfile;
