import Lottie from "lottie-react";
import { NavLink } from "react-router";
import call_to_action from "../../public/lottie-files/cta.json";

const CallToAction = () => {
  return (
    <section className="w-full px-6 py-12 md:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row-reverse items-center gap-8">
        {/* Lottie Animation */}
        <div className="w-full md:w-2/5 flex justify-center">
          <Lottie
            animationData={call_to_action}
            className="w-full max-w-[250px] md:max-w-full"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-3/5 text-center md:text-left space-y-6">
          <h2 className="text-3xl gradient-text md:text-4xl font-bold">
            Ready to Join a Camp?
          </h2>
          <p className="text-lg dark:text-gray-300">
            Discover camps that inspire, educate, and empower. Start your
            journey with CampAID today.
          </p>

          <NavLink to="/available-camps">
            <button className="bg-gradient-to-bl btn from-violet-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:scale-105 transition-transform duration-200">
              Explore Camps
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
