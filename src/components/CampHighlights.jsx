import { GraduationCap, Brain, ShieldCheck, Baby, Wallet, Sparkles } from "lucide-react";

const CampHighlights = () => {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from certified professionals passionate about teaching.",
      icon: <GraduationCap className="w-10 h-10 text-violet-500" />,
    },
    {
      title: "Hands-on Learning",
      description: "Interactive, project-based activities that spark creativity.",
      icon: <Brain className="w-10 h-10 text-violet-500" />,
    },
    {
      title: "Safe Environment",
      description: "Your child’s safety and well-being is our top priority.",
      icon: <ShieldCheck className="w-10 h-10 text-violet-500" />,
    },
    {
      title: "Age-Based Programs",
      description: "Tailored activities for each age group to ensure engagement.",
      icon: <Baby className="w-10 h-10 text-violet-500" />,
    },
    {
      title: "Affordable Pricing",
      description: "Flexible plans and early bird discounts available.",
      icon: <Wallet className="w-10 h-10 text-violet-500" />,
    },
    {
      title: "Memorable Experience",
      description: "Campers leave with new friends, new skills, and big smiles!",
      icon: <Sparkles className="w-10 h-10 text-violet-500" />,
    },
  ];

  return (
    <section className="lg:pb-14 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampHighlights;
