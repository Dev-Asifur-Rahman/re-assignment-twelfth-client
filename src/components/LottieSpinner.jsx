import React from "react";
import spinner from "../../public/lottie-files/spinner.json";
import Lottie from "lottie-react";

const LottieSpinner = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <Lottie className="h-[80px] w-[80px]" animationData={spinner}></Lottie>
    </section>
  );
};

export default LottieSpinner;
