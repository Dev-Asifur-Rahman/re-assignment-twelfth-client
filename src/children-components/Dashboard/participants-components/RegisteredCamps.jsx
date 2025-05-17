import { useContext, useState } from "react";
import { Context } from "../../../js/context";
import LottieSpinner from "../../../components/LottieSpinner";
import useUserRegisteredCamps from "../../../hook/useUserRegisteredCamps";
import { AiOutlineDelete } from "react-icons/ai";
import { ApiInstance } from "../../../js/api-instance";
import { useNavigate } from "react-router";
import CommonHeading from "../../../components/CommonHeading";
import { swalError, swalSuccess, toastError } from "../../../js/utils";
import useTopThreeCamps from "../../../hook/useTopThreeCamps";

const RegisteredCamps = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [campId, setCampId] = useState();
  const [loading,setLoading] = useState()
  const { user, role } = useContext(Context);
  const navigate = useNavigate();
  const {refetch:refetch_feedback} = useTopThreeCamps()

  const payment_route = (camp) => {
    navigate("/dashboard/registration-payment", { state: { camp } });
  };

  const sendFeedback = () => {
    setLoading(true)
    if (!feedback) {
      setLoading(false)
      return toastError("Feedback Can't be blank");
    }
    if (rating === 0) {
      setLoading(false)
      return toastError("Submit Rating First");
    }
    const feedback_object = {
      campId,
      email:user?.email,
      feedback,
      rating
    }
    ApiInstance.post("/feedback",feedback_object).then(res=>{
      if(res.data.acknowledged){
        setLoading(false)
        swalSuccess('Thanks for your Feedback')
        setFeedback("")
        setRating(0)
        setShowModal(false)
        refetch_feedback()
      }
      else{
        setLoading(false)
        swalError('Feedback Error','You already gave a Feedback')
      }
    }).catch(error=>{
      setLoading(false)
      swalError('Feedback Error! Try Again')
    })
  };

  function deleteRegistration(id, campId) {
    const object = { id, campId };
    ApiInstance.delete("/reject-registration", { data: object }).then((res) =>
      refetch()
    );
  }

  const {
    data: user_registered_camps,
    isPending,
    refetch,
  } = useUserRegisteredCamps(user?.email);
  if (isPending) {
    return <LottieSpinner></LottieSpinner>;
  } else {
    return (
      <div>
        <CommonHeading
          heading="Registered Camps"
          description="Keep track of all the medical camps you have signed up for."
        />

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Camp Name</th>
                <th>Camp Fee</th>
                <th>Name</th>
                <th className="text-center">Payment Status</th>
                <th className="text-center">Confirmation Status</th>
                <th className=" text-center">Cancel</th>
                <th className="text-center">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {user_registered_camps.map((user, index) => {
                return (
                  <tr className="tr" key={user?._id}>
                    <th>{index + 1}</th>
                    <td>{user?.patient}</td>
                    <td>{user?.camp_name}</td>
                    <td>{user?.camp_fee} TK</td>
                    <td>
                      <p className="text-center w-full">
                        {user?.payment_status === true ? (
                          "Paid"
                        ) : (
                          <button
                            className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500"
                            onClick={() => payment_route(user)}
                          >
                            Pay
                          </button>
                        )}
                      </p>
                    </td>
                    <td className="">
                      <p className="w-full text-center">
                        {user?.confirmation_status === true
                          ? "Confirmed"
                          : "Pending"}
                      </p>
                    </td>
                    <td className="">
                      <div className="w-full flex justify-center">
                        <button
                          className="flex justify-center"
                          onClick={() =>
                            deleteRegistration(user?._id, user?.campId)
                          }
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </td>
                    <td className="">
                      {user?.payment_status === true ? (
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setCampId(user?.campId);
                          }}
                          disabled={!role && user.confirmation_status === false}
                          className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 disabled:bg-gray-300 disabled:bg-none disabled:text-black"
                        >
                          Feedback
                        </button>
                      ) : (
                        <p className="w-full flex justify-center">N/A</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Give Your Feedback</h2>

              <textarea
                required
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>

              {/* Custom Star Rating */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    onClick={() => setRating(value)}
                    className={`w-8 h-8 cursor-pointer ${
                      value <= rating ? "text-orange-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.174L12 18.896l-7.334 3.87 1.4-8.174L.132 9.21l8.2-1.192z" />
                  </svg>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={sendFeedback}
                  className="btn bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white"
                >
                  {loading?<span className="loading text-white loading-dots loading-sm"></span>:"Submit"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default RegisteredCamps;
