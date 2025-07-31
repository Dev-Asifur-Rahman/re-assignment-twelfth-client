import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { imageUpload } from "../../../js/imageupload";
import { swalError, swalSuccess, toastError } from "../../../js/utils";
import { ApiInstance } from "../../../js/api-instance";
import CallyCalender from "../../../components/CallyCalender";
import useAllCamp from "../../../hook/useAllCamp";

const UpdateCamp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refetch } = useAllCamp();
  const camp_object = location?.state;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [calenderDate, setCalenderDate] = useState("Pick a Date");

  const update_camp = async (e) => {
    e.preventDefault();
    setLoading(true);
    let final_image = camp_object?.image;
    const target = e.target;
    const camp_name = target.camp_name.value;
    const imageFile = target.image.files[0];
    const camp_fee = parseInt(target.camp_fee.value);
    const location = target.location.value;
    const professional_name = target.professional_name.value;
    const participants = parseInt(target.participants.value);
    const description = target.description.value;
    if (imageFile) {
      const uploaded_image = await imageUpload(imageFile);

      if (!uploaded_image) {
        setLoading(false);
        return toastError("Image Upload Failed");
      }
      final_image = uploaded_image;
    }
    if (calenderDate === "Pick a Date") {
      setLoading(false);
      return toastError("Enter Date");
    }
    const appointment_date = calenderDate;
    const camp_data = {
      camp_name,
      image: final_image,
      camp_fee,
      appointment_date,
      location,
      professional_name,
      participants,
      description,
    };
    ApiInstance.patch(`/update-camp/${camp_object?._id}`, camp_data).then(
      (res) => {
        if (res.data.acknowledged) {
          setLoading(false);
          target.reset();
          swalSuccess("Camp-Updated");
          refetch();
          navigate("/dashboard/manage-camps");
        } else {
          setLoading(false);
          toastError("Something Went Wrong.Try Again!");
        }
      }
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={update_camp} className=" px-6">
        <fieldset
          id="camp-div"
          className="fieldset w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center"
        >
          <div>
            <legend className="fieldset-legend">Camp Name</legend>
            <input
              required
              type="text"
              name="camp_name"
              defaultValue={camp_object?.camp_name}
              className="input"
              placeholder="Camp Name"
            />
          </div>

          <div>
            <legend className="fieldset-legend">Image URL</legend>
            <input type="file" className="file-input" name="image" />
          </div>

          <div>
            <legend className="fieldset-legend">Camp Fee</legend>
            <input
              required
              type="text"
              name="camp_fee"
              className="input"
              defaultValue={camp_object?.camp_fee}
              placeholder="Camp Fee"
            />
          </div>
          <div className="relative">
            <legend className="fieldset-legend">Appointment Date</legend>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="input"
            >
              {calenderDate}
            </button>
            {open && (
              <CallyCalender
                setCalenderDate={setCalenderDate}
                setOpen={setOpen}
                open={open}
              />
            )}
          </div>

          <div>
            <legend className="fieldset-legend">Location</legend>
            <input
              required
              type="text"
              name="location"
              className="input"
              defaultValue={camp_object?.location}
              placeholder="Location "
            />
          </div>

          <div>
            <legend className="fieldset-legend">
              HealthCare Professional Name
            </legend>
            <input
              name="professional_name"
              required
              type="text"
              className="input"
              defaultValue={camp_object?.professional_name}
              placeholder="Professional Name"
            />
          </div>

          <div>
            <legend className="fieldset-legend">Participants</legend>
            <input
              type="text"
              readOnly
              name="participants"
              className="input"
              defaultValue={camp_object?.participants ?? 0}
              placeholder="Total Participants"
            />
          </div>
          <div>
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              name="description"
              className="input"
              defaultValue={camp_object?.description}
              placeholder="Description"
            />
          </div>
          <button className="my-5 btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 lg:col-span-2 md:col-span-2 col-span-1">
            {loading ? (
              <span className="loading text-white loading-dots loading-sm"></span>
            ) : (
              "Update Camp"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateCamp;
