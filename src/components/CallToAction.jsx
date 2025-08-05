import { NavLink } from "react-router";

const CallToAction = () => {
  return (
    <section className="w-full px-6 py-12 md:py-20 bg-white dark:bg-[#1a1f26] text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Join a Camp?
        </h2>
        <p className="text-lg dark:text-gray-300">
          Discover camps that inspire, educate, and empower. Start your journey
          with CampAID today.
        </p>

        <NavLink to="/available-camps">
          <button className="bg-linear-to-bl btn text-white from-violet-500 to-fuchsia-500 font-semibold px-6  py-3 rounded-md shadow-md hover:scale-105 transition-transform duration-200">
            Explore Camps
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default CallToAction;
