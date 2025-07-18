import useTopThreeCamps from "../hook/useTopThreeCamps";
import HomeCard from "./HomeCard";

const TopFavouriteCamp = () => {
  const { data, isPending, refetch } = useTopThreeCamps();
  return (
    <section className="w-full gap-y-6 md:gap-y-0 lg:gap-y-0 py-3 grid  lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
      {data.map((camp) => (
        <HomeCard key={camp?._id} camp={camp}></HomeCard>
      ))}
    </section>
  );
};

export default TopFavouriteCamp;
