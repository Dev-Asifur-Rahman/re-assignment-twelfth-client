import React from "react";
import useRegisteredUser from "../../../hook/useRegisteredUser";
import LottieSpinner from "./../../../components/LottieSpinner";
import { swalConfirm, swalError, swalSuccess } from "../../../js/utils";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ApiInstance } from "../../../js/api-instance";
import CommonHeading from "../../../components/CommonHeading";

const ManageRegisteredCamps = () => {
  const { registered_users, isPending, refetch } = useRegisteredUser();
  const showModal = (status, id, confirmed) => {
    if (!status) {
      return swalError("Can't Confirm", "User Should Pay First");
    } else {
      if (confirmed) {
        return swalError("Can't Confirm", "Already Confirmed Registration");
      } else {
        swalConfirm("Confirm?").then((result) => {
          if (result.isConfirmed) {
            ApiInstance.patch(`/confirm-status/${id}`).then((res) => {
              if (res.data.acknowledged) {
                swalSuccess("Registration Confirmed !");
                refetch();
              }
            });
          }
        });
      }
    }
  };
  const deleteRegistration = (id, campId) => {
    swalConfirm("Delete Registration?").then((result) => {
      if (result.isConfirmed) {
        ApiInstance.delete(`/cancel-registration/${id}?campId=${campId}`).then(
          (result) => {
            if (result.data.acknowledged) {
              swalSuccess("Deleted Successfully");
              refetch();
            }
          }
        );
      }
    });
  };
  if (isPending) {
    return <LottieSpinner></LottieSpinner>;
  } else {
    return (
      <div className="w-full">
        <CommonHeading
          heading="Manage Registered Camps"
          description="Oversee participant lists and registrations for your camps."
        />

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Camp Name</th>
                <th>Camp Fee</th>
                <th>Payment Status</th>
                <th>Confirmation Status</th>
                <th className=" text-center">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {registered_users.map((user, index) => {
                return (
                  <tr className="tr" key={user?._id}>
                    <th>{index + 1}</th>
                    <td>{user?.patient}</td>
                    <td>{user?.camp_name}</td>
                    <td>{user?.camp_fee} TK</td>
                    <td>{user?.payment_status === true ? "Paid" : "Unpaid"}</td>
                    <td>
                      <p
                        className="w-fit"
                        onClick={() =>
                          showModal(
                            user?.payment_status,
                            user?._id,
                            user?.confirmation_status
                          )
                        }
                      >
                        {user?.confirmation_status === true
                          ? "Confirmed"
                          : "Pending"}
                      </p>
                    </td>
                    <td className=" flex justify-center items-center">
                      {user?.confirmation_status === true ? (
                        <button className="">
                          <IoMdCheckmarkCircleOutline />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            deleteRegistration(user?._id, user?.campId)
                          }
                          disabled={
                            user?.payment_status && user?.confirmation_status
                          }
                          className=""
                        >
                          <RxCross2 />
                        </button>
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

export default ManageRegisteredCamps;
