import React, { useState } from "react";
import useAllCamp from "../../../hook/useAllCamp";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import LottieSpinner from "../../../components/LottieSpinner";
import { ApiInstance } from "../../../js/api-instance";
import { swalConfirm, swalError, swalSuccess } from "../../../js/utils";
import { useNavigate } from "react-router";
import CommonHeadingNoMargin from "../../../components/CommonHeadingNoMargin";

const ManageCamps = () => {
  const { all_camps, isPending, refetch } = useAllCamp();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = all_camps.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(all_camps.length / dataPerPage);

  const updateCamp = (camp) => {
    swalConfirm("Update This Camp ?").then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard/update-camp", { state: camp });
      }
    });
  };

  const deleteCamp = (id) => {
    swalConfirm("Are You Sure?").then((result) => {
      if (result.isConfirmed) {
        ApiInstance.delete(`/delete-camp/${id}`)
          .then((res) => {
            if (res.data.acknowledged) {
              swalSuccess("Camp Removed Successfully");
              refetch();
            }
          })
          .catch(() => {
            swalError("Error Occured", "Something went Wrong!");
          });
      }
    });
  };

  if (isPending) {
    return <LottieSpinner />;
  }

  return (
    <div className="w-full">
      <CommonHeadingNoMargin
        heading="Manage Your Camps"
        description="Edit, update, or remove your existing medical camps."
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className=" text-center">Date</th>
              <th className="">Location</th>
              <th>Professional</th>
              <th className="text-center">Edit</th>
              <th className="flex justify-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((camp, index) => (
              <tr key={camp?._id}>
                <th>{firstIndex + index + 1}</th>
                <td>{camp?.camp_name}</td>
                <td className=" text-center">{camp?.appointment_date}</td>
                <td className="">{camp?.location}</td>
                <td>{camp?.professional_name}</td>
                <td className="text-center">
                  <button
                    onClick={() => updateCamp(camp)}
                    className="flex justify-center w-full"
                  >
                    <LiaEdit />
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => deleteCamp(camp?._id)}
                    className="flex justify-center w-full"
                  >
                    <AiOutlineDelete />
                  </button>
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
              currentPage === i + 1 ? "bg-violet-500" : "bg-gray-200 dark:bg-inherit"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageCamps;
