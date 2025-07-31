import { useState } from "react";
import "cally";
import CallyCalender from "../../../components/CallyCalender";
import { swalSuccess, toastError, toastSuccess } from "../../../js/utils";
import { imageUpload } from "../../../js/imageupload";
import { ApiInstance } from "../../../js/api-instance";
import useAllCamp from "./../../../hook/useAllCamp";
import CommonHeadingNoMargin from "../../../components/CommonHeadingNoMargin";

const AddCamp = () => {
  const { refetch } = useAllCamp();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [calenderDate, setCalenderDate] = useState("Pick a Date");

  const add_camp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target;
    const camp_name = target.camp_name.value;
    const imageFile = target.image.files[0];
    const camp_fee = parseInt(target.camp_fee.value);
    const location = target.location.value;
    const professional_name = target.professional_name.value;
    const participants = parseInt(target.participants.value);
    const description = target.description.value;
    if (calenderDate === "Pick a Date") {
      setLoading(false);
      return toastError("Enter Date");
    } else {
      const image = await imageUpload(imageFile);
      if (!image) {
        setLoading(false);
        return toastError("Image upload failed.");
      } else {
        const appointment_date = calenderDate;
        const camp_data = {
          camp_name,
          image,
          camp_fee,
          appointment_date,
          location,
          professional_name,
          participants,
          description,
        };
        ApiInstance.post("/upload-camp", camp_data).then((res) => {
          if (res.data.acknowledged) {
            setLoading(false);
            target.reset();
            swalSuccess("New Camp Added");
            refetch();
          } else {
            setLoading(false);
            toastError("Something Went Wrong.Try Again!");
          }
        });
      }
    }
  };

  return (
    <section>
      <div className="w-full">
        <CommonHeadingNoMargin
          heading="Add A New Camp"
          description="Create and publish a new medical camp for participants to join."
        />

        <form onSubmit={add_camp} className=" px-6"></form>
        <section
        id="camp-div"
        className="grid lg:grid-cols-2 place-items-center w-full"
      >
        
        <div className="">
          <legend className="fieldset-legend">Camp Name</legend>
          <input
            required
            type="text"
            name="camp_name"
            className="input"
            placeholder="Camp Name"
          />
        </div>
        

        <div>
          <legend className="fieldset-legend">Image URL</legend>
          <input type="file" required className="file-input" name="image" />
        </div>

        <div>
          <legend className="fieldset-legend">Camp Fee</legend>
          <input
            required
            type="text"
            name="camp_fee"
            className="input"
            placeholder="Camp Fee"
          />
        </div>
        <div className="relative">
          <legend className="fieldset-legend">Appointment Date</legend>
          <button
            id="appointment-date-button"
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
            placeholder="Total Participants"
            value={0}
          />
        </div>
        <div>
          <legend className="fieldset-legend">Description</legend>
          <input
            type="text"
            name="description"
            className="input"
            placeholder="Description"
          />
        </div>
        <button className="my-10 px-10 btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 lg:col-span-2 md:col-span-2 col-span-1">
            {loading ? (
              <span className="loading text-white loading-dots loading-sm"></span>
            ) : (
              "Add Camp"
            )}
          </button>
      </section>
      </div>
    </section>
  );
};

export default AddCamp;
