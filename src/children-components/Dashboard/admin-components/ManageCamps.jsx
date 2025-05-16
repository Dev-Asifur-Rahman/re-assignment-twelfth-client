import useAllCamp from "../../../hook/useAllCamp";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import LottieSpinner from "../../../components/LottieSpinner";
import { ApiInstance } from "../../../js/api-instance";
import { swalConfirm, swalError, swalSuccess } from "../../../js/utils";
import { useNavigate } from "react-router";
import CommonHeading from "../../../components/CommonHeading";

const ManageCamps = () => {
  const { all_camps, isPending, refetch } = useAllCamp();
  const navigate = useNavigate();

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
          .catch((error) => {
            swalError("Error Occured", "Something went Wrong!");
          });
      }
    });
  };

  if (isPending) {
    return <LottieSpinner></LottieSpinner>;
  } else {
    return (
      <div className="w-full">
        <CommonHeading
          heading="Manage Your Camps"
          description="Edit, update, or remove your existing medical camps."
        />

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Professional</th>
                <th className="text-center">Edit</th>
                <th className="flex justify-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {all_camps.map((camp, index) => {
                return (
                  <tr key={camp?._id}>
                    <th>{index + 1}</th>
                    <td>{camp?.camp_name}</td>
                    <td>{camp?.appointment_date}</td>
                    <td>{camp?.location}</td>
                    <td>{camp?.professional_name}</td>
                    <td className="">
                      <p
                        className="w-full flex justify-center"
                        onClick={() => updateCamp(camp)}
                      >
                        <LiaEdit />
                      </p>
                    </td>
                    <td
                      onClick={() => {
                        deleteCamp(camp?._id);
                      }}
                    >
                      <p className="w-full flex justify-center">
                        <AiOutlineDelete />
                      </p>
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

export default ManageCamps;
