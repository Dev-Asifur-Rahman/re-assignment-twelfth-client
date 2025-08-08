import { Search, UserPlus, ClipboardList, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Browse Camps",
      description:
        "Explore our wide range of camps and choose the one that excites you.",
    },
    {
      icon: <UserPlus className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Create an Account",
      description:
        "Sign up in minutes to manage your bookings and camper details.",
    },
    {
      icon: <ClipboardList className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Register Online",
      description:
        "Complete the quick online registration form and secure your spot.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Get Confirmation",
      description: "Receive your confirmation email and get ready for camp!",
    },
  ];

  return (
    <section className="lg:pb-16 md:pb-14">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Timeline */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between relative">
          {/* Vertical/Horizontal line */}
          <div
            className="absolute md:top-12 md:left-0 md:right-0 md:h-1 md:bg-violet-300 
                          left-8 top-0 bottom-0 w-1 bg-violet-300 md:w-full"
          ></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex md:flex-col items-center md:w-1/4 mb-10 md:mb-0"
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg text-white z-10
                w-12 h-12 md:w-16 md:h-16"
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="ml-6 md:ml-0 md:mt-6 text-left md:text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
