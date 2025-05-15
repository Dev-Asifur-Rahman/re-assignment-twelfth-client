import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router";

const PaymentRoute = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  const location = useLocation()
  const {camp} = location?.state
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm camp={camp}></PaymentForm>
      </Elements>
    </>
  );
};

export default PaymentRoute;
