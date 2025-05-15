import { useContext } from "react";
import { Context } from "../../../js/context";
import LottieSpinner from "../../../components/LottieSpinner";
import useUserRegisteredCamps from "../../../hook/useUserRegisteredCamps";
import { AiOutlineDelete } from "react-icons/ai";
import { ApiInstance } from "../../../js/api-instance";
import { useNavigate } from "react-router";

const RegisteredCamps = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const payment_route = (camp) => {
    navigate("/dashboard/registration-payment",{state:{camp}});
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
                            onClick={()=>payment_route(user)}
                          >
                            Pay
                          </button>
                        )}
                      </p>
                    </td>
                    <td className="">
                      <p
                        className="w-full text-center"
                        
                      >
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
                          disabled={user && user.confirmation_status === false}
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
