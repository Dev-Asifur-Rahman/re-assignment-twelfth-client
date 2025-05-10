import { useContext } from "react";
import { Context } from "../../../js/context";
import LottieSpinner from "../../../components/LottieSpinner";
import useUserRegisteredCamps from "../../../hook/useUserRegisteredCamps";
import { AiOutlineDelete } from "react-icons/ai";
import { ApiInstance } from "../../../js/api-instance";

const RegisteredCamps = () => {
  const { user } = useContext(Context);
  function deleteRegistration(id, campId) {
    const object = {id,campId}
    ApiInstance.delete("/reject-registration",{data:object}).then(res=>refetch())
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
                <th>Confirmation Status</th>
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
                        {user?.payment_status === true ? "Paid" : "Pay"}
                      </p>
                    </td>
                    <td>
                      <p
                      // className="w-fit"
                      // onClick={() =>
                      //   showModal(
                      //     user?.payment_status,
                      //     user?._id,
                      //     user?.confirmation_status
                      //   )
                      // }
                      >
                        {user?.confirmation_status === true
                          ? "Confirmed"
                          : "Pending"}
                      </p>
                    </td>
                    <td className=" flex justify-center items-center">
                      <button
                        className="flex justify-center"
                        onClick={() =>
                          deleteRegistration(user?._id, user?.campId)
                        }
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                    <td className="">
                      {user?.payment_status === true ? (
                        <button
                          disabled={!confirmation_status}
                          className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500"
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
      </div>
    );
  }
};

export default RegisteredCamps;
