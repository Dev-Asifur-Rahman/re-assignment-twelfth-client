import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import HomeCard from "./HomeCard";
import useAllCamp from "../hook/useAllCamp";

const HomeSwiper = () => {
  const { all_camps, isPending, refetch } = useAllCamp();
  return (
    <>
      <section className="w-full h-[340px]">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          className="mySwiper h-full w-full"
        >
          {[...all_camps]
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 6)
            .map((camp, index) => (
              <SwiperSlide key={index} style={{ width: "250px" }} className="">
                <HomeCard camp={camp} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
};

export default HomeSwiper;
