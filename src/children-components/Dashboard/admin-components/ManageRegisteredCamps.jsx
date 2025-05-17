import React, { useState } from "react";
import useRegisteredUser from "../../../hook/useRegisteredUser";
import LottieSpinner from "./../../../components/LottieSpinner";
import { swalConfirm, swalError, swalSuccess } from "../../../js/utils";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ApiInstance } from "../../../js/api-instance";
import CommonHeading from "../../../components/CommonHeading";

const ManageRegisteredCamps = () => {
  const { registered_users, isPending, refetch } = useRegisteredUser();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = registered_users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(registered_users.length / dataPerPage);

  const showModal = (status, id, confirmed) => {
    if (!status) {
      return swalError("Can't Confirm", "User Should Pay First");
    } else if (confirmed) {
      return swalError("Can't Confirm", "Already Confirmed Registration");
    } else {
      swalConfirm("Confirm?").then((result) => {
        if (result.isConfirmed) {
          ApiInstance.patch(`/confirm-status/${id}`).then((res) => {
            if (res.data.acknowledged) {
              swalSuccess("Registration Confirmed!");
              refetch();
            }
          });
        }
      });
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

  if (isPending) return <LottieSpinner />;

  return (
    <div className="w-full">
      <CommonHeading
        heading="Manage Registered Camps"
        description="Oversee participant lists and registrations for your camps."
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Camp Name</th>
              <th>Camp Fee</th>
              <th className="text-center">Payment Status</th>
              <th className="text-center">Confirmation Status</th>
              <th className="text-center">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr key={user?._id}>
                <th>{firstIndex + index + 1}</th>
                <td>{user?.patient}</td>
                <td>{user?.camp_name}</td>
                <td>{user?.camp_fee} TK</td>
                <td className="text-center">
                  {user?.payment_status ? "Paid" : "Unpaid"}
                </td>
                <td
                  className="text-center cursor-pointer"
                  onClick={() =>
                    showModal(
                      user?.payment_status,
                      user?._id,
                      user?.confirmation_status
                    )
                  }
                >
                  {user?.confirmation_status ? "Confirmed" : "Pending"}
                </td>
                <td className="text-center">
                  {user?.confirmation_status ? (
                    <IoMdCheckmarkCircleOutline className="inline" />
                  ) : (
                    <button
                      onClick={() =>
                        deleteRegistration(user?._id, user?.campId)
                      }
                      disabled={
                        user?.payment_status && user?.confirmation_status
                      }
                    >
                      <RxCross2 className="inline" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "bg-violet-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
