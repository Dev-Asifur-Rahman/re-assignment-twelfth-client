import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { swalSuccess, toastError } from "../../../js/utils";
import { useContext, useEffect, useState } from "react";
import { ApiInstance } from "../../../js/api-instance";
import { Context } from "../../../js/context";
import useUserRegisteredCamps from "../../../hook/useUserRegisteredCamps";
import useUserPaymentHistory from "../../../hook/useUserPaymentHistory";
import { useNavigate } from "react-router";

const PaymentForm = ({ camp }) => {
  const { refetch: refetch_registration } = useUserRegisteredCamps();
  const { refetch: refetch_payment_history } = useUserPaymentHistory();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    ApiInstance.post("/create-payment-intent", { fee: camp?.camp_fee }).then(
      (res) => {
        setClientSecret(res.data.clientSecret);
      }
    );
  }, [camp]);

  const paymentForm = async (e) => {
    e.preventDefault();
    const target = e.target;
    if (!stripe || !elements) {
      return toastError("Error Occured in Stripe");
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return toastError("Card Error! Try Again");
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      return toastError(error.message);
    } 
    // else {
    //   console.log(paymentMethod);
    // }
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });
    if (confirmError) {
      return toastError(confirmError.message);
    } else {
      if (paymentIntent.status == "succeeded") {
        const payment_data = {
          email: user?.email,
          campId: camp?._id,
          transactionId: paymentIntent.id,
          fee: camp?.camp_fee,
          camp_name: camp?.camp_name,
          payment_status: true,
          date: new Date(),
        };
        ApiInstance.post("/upload-payment-history", payment_data).then(
          (res) => {
            if (res.data.acknowledged) {
              swalSuccess("Payment Successful");
              refetch_registration();
              refetch_payment_history();
              navigate('/dashboard/user-registered-camps')
            }
          }
        );
      }
    }
  };
  return (
    <form onSubmit={paymentForm}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        disabled={!stripe || !clientSecret}
        className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
