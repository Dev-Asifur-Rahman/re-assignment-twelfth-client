import React, { useContext, useState } from "react";
import { Context } from "../../../js/context";
import { swalSuccess, toastError } from "../../../js/utils";
import { imageUpload } from "../../../js/imageupload";
import { update_Profile } from "../../../js/firebase-operation";
import CommonHeadingNoMargin from "../../../components/CommonHeadingNoMargin";

const OrganizerProfile = () => {
  const { user, role } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target;
    const name = target.name.value;
    const imageFile = target.image.files[0];
    let final_image = user?.photoURL;
    if (imageFile) {
      const uploaded_image = await imageUpload(imageFile);

      if (!uploaded_image) {
        setLoading(false);
        return toastError("Image Upload Failed");
      }
      final_image = uploaded_image;
    }
    update_Profile(name, final_image)
      .then((res) => {
        swalSuccess("Profile Updated Successfully");
        window.location.reload();
      })
      .catch((error) => {
        toastError("Update Failed!");
      });
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <section className="w-full">
      <CommonHeadingNoMargin
        heading="Organizer Profile"
        description="View and update your information as a camp organizer."
      />
      <div className="relative h-fit lg:p-8 md:p-8 px-8 flex items-center justify-center">
        {/* Profile Section */}
        <div className="bbackdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-lg w-full border border-white/20 z-10 lg:my-15 md:my-0 my-0 flex flex-col md:flex-row lg:flex-row lg:items-center md:items-center lg:gap-5 md:gap-5 gap-2">
          <div className="flex md:w-fit lg:w-fit w-full justify-center lg:justify-start md:justify-start lg:mb-6 md:mb-6 mb-3">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
              {user?.displayName}
            </h1>

            <div className="mt-2 text-sm sm:text-base font-medium ">
              <p>
                Role:{" "}
                <span className="gradient-text">
                  {role ? "Admin" : "Unknown"}
                </span>
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-medium text-violet-600">
                Email
              </h3>
              <p className="text-sm sm:text-lg text-gray-700">{user?.email}</p>
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
            <form
              onSubmit={updateProfile}
              className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md"
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-violet-500"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  PhotoURL
                </label>
                <input type="file" className="file-input w-full" name="image" />
                {user && (
                  <label className="block overflow-hidden text-sm font-medium mb-1">
                    ({user?.photoURL})
                  </label>
                )}
              </div>

              <button className="mt-2 px-4 py-2 bg-violet-500 text-white rounded w-full  bg-linear-to-bl from-violet-500 to-fuchsia-500">
                {loading === true ? (
                  <span className="loading text-white loading-dots loading-sm"></span>
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizerProfile;
