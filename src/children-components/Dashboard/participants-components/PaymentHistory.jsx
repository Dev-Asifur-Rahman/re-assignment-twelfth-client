import React from "react";
import useUserPaymentHistory from "../../../hook/useUserPaymentHistory";
import NoDataUI from "../../../components/NoDataUI";

const PaymentHistory = () => {
  const { data, isPending } = useUserPaymentHistory();
  if (data?.length === 0) {
    return <NoDataUI></NoDataUI>;
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
                <th>Fee</th>
                <th>Transaction No</th>
                <th>Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((payment, index) => {
                return (
                  <tr key={payment?._id}>
                    <th>{index+1}</th>
                    <td>{payment?.camp_name}</td>
                    <td>{payment?.fee}</td>
                    <td>{payment?.transactionId}</td>
                    <td>{payment?.date}</td>
                    <td>{payment?.payment_status && "Paid"}</td>
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

export default PaymentHistory;
