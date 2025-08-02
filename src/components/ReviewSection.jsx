import { useState } from "react";
import { Star } from "lucide-react";
import useAllFeedback from "../hook/useAllFeedback";

const FeedbackSection = () => {
  const { data, isPending } = useAllFeedback();
  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleFeedback = data?.slice(0, visibleCount) || [];

  return (
    <div className="p-6 sm:p-10 min-h-screen">
      <h2 className="text-4xl font-bold gradient-text mb-10 text-center">
        User Feedback
      </h2>

      {isPending ? (
        <p className="text-center text-black text-xl">Loading feedback...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleFeedback.map((item, index) => (
              <div
                key={index}
                className="bg-inherit dark:bg-black/10 rounded-lg shadow-xl p-6 pr-8 hover:scale-105 transition-transform duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.photoURL}
                    alt="User"
                    className="w-14 h-14 rounded-full border-2 border-violet-500 shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="font-semibold  truncate max-w-full">
                      {item.email}
                    </p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < item.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-lg break-words">
                  “{item.feedback}”
                </p>
              </div>
            ))}
          </div>

          {visibleCount < data.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleViewMore}
                className="px-8 py-3 bg-white text-violet-600 font-semibold rounded-full shadow-md hover:bg-violet-600 hover:text-white transition"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackSection;
