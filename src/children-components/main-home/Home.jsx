import React from "react";
import HomeSwiper from "../../components/HomeSwiper";
import Banner from "../../components/Banner";
import CommonHeading from "../../components/CommonHeading";
import { NavLink } from "react-router";

function Home() {
  return (
    <div>
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
    </div>
  );
}

export default Home;
