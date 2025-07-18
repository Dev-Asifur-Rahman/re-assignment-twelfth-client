import HomeSwiper from "../../components/HomeSwiper";
import Banner from "../../components/Banner";
import CommonHeading from "../../components/CommonHeading";
import { NavLink } from "react-router";

import TopFavouriteCamp from "../../components/TopFavouriteCamp";
import ReviewSection from "../../components/ReviewSection"
import Test from "../../components/Test";

function Home() {
  
  return (
    <div className="">
      <Banner></Banner>
      <CommonHeading
        heading="Most Popular Medical Camps"
        description="Explore top-attended camps that made the biggest impact on communities."
      />

      <HomeSwiper></HomeSwiper>
      <div className="flex justify-center items-center w-full my-4">
        <NavLink to={"/available-camps"}>
          <button className="btn btn-sm text-white bg-linear-to-bl from-violet-500 to-fuchsia-500">
            See All Camps
          </button>
        </NavLink>
      </div>
      <CommonHeading
        heading="Camps That Made a Mark"
        description="Experience the top-rated camps that participants loved the most."
      />
      <TopFavouriteCamp></TopFavouriteCamp>
      <ReviewSection></ReviewSection>
    </div>
  );
}

export default Home;
