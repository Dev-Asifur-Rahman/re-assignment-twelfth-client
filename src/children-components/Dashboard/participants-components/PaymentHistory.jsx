import React, { useState, useEffect } from "react";
import useUserPaymentHistory from "../../../hook/useUserPaymentHistory";
import NoDataUI from "../../../components/NoDataUI";
import CommonHeading from "../../../components/CommonHeading";

const PaymentHistory = () => {
  const { data, isPending } = useUserPaymentHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1); // reset on new data
  }, [data]);

  if (!isPending && data?.length === 0) {
    return <NoDataUI />;
  }

  const totalPages = Math.ceil((data?.length || 0) / paymentsPerPage);
  const indexOfLast = currentPage * paymentsPerPage;
  const indexOfFirst = indexOfLast - paymentsPerPage;
  const currentPayments = data?.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div>
      <CommonHeading
        heading="Payment History"
        description="Review your past payments and transaction details."
      />

      {isPending ? (
        <div className="text-center py-10">Loading payments...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
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
                {currentPayments?.map((payment, index) => (
                  <tr key={payment?._id}>
                    <th>{indexOfFirst + index + 1}</th>
                    <td>{payment?.camp_name}</td>
                    <td>{payment?.fee}</td>
                    <td>{payment?.transactionId}</td>
                    <td>{payment?.date}</td>
                    <td>{payment?.payment_status && "Paid"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="join flex justify-center mt-8 flex-wrap gap-1">
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {renderPageNumbers()}
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
