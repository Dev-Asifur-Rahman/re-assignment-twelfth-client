import useAllCamp from "../../../hook/useAllCamp";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import LottieSpinner from "../../../components/LottieSpinner";

const ManageCamps = () => {
  const { all_camps, isPending, refetch } = useAllCamp();

  const updateCamp = (camp) => {
    console.log(camp);
  };
  const deleteCamp = (id) => {
    console.log(id);
  };
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
