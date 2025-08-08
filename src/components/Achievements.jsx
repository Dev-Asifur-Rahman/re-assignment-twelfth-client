import { Users, Award, Smile, CalendarCheck } from "lucide-react";

const Achievements = () => {
  const stats = [
    {
      icon: <Users className="w-10 h-10 text-violet-500" />,
      number: "500+",
      label: "Happy Campers",
    },
    {
      icon: <Award className="w-10 h-10 text-violet-500" />,
      number: "10+",
      label: "Years of Excellence",
    },
    {
      icon: <Smile className="w-10 h-10 text-violet-500" />,
      number: "95%",
      label: "Parent Satisfaction",
    },
    {
      icon: <CalendarCheck className="w-10 h-10 text-violet-500" />,
      number: "30+",
      label: "Programs Offered",
    },
  ];

  return (
    <section className="pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.number}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
