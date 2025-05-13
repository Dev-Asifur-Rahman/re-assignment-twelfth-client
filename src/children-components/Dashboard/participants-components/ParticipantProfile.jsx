import React, { useContext, useState } from "react";
import { Context } from "../../../js/context";

const OrganizerProfile = () => {
  const { user, role } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-violet-500 to-fuchsia-500 p-8 flex items-center justify-center">
      {/* Profile Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-lg w-full border border-white/20 z-10">
        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {user?.displayName}
          </h1>

          <div className="mt-2 text-sm sm:text-base font-medium text-gray-600">
            <p>
              Role: <span className="text-violet-600">{role?"Unknown":"Participant"}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-medium text-violet-600">Email</h3>
            <p className="text-sm sm:text-lg text-gray-700">{user?.email}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-medium text-violet-600">Phone</h3>
            <p className="text-sm sm:text-lg text-gray-700">
              {user?.phoneNumber ? user.phoneNumber : "N/A"}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal Overlay + Content */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>
            <p className="text-gray-700 mb-4">You can add your form here later.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerProfile;
