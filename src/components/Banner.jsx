import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bannerOne from "../../public/banner-images/bannerimageone.jpeg";
import bannerTwo from "./../../public/banner-images/bannerimagetwo.jpg";
import bannerThree from "./../../public/banner-images/bannerimagethree.jpg";
import bannerFour from "./../../public/banner-images/bannerimagefour.png";
import { Autoplay } from "swiper/modules";

const slides = [
  {
    title: "500+ Patients Treated in One Day",
    description:
      "A landmark medical camp in Bogura provided care to over 500 people in 8 hours.",
    image: bannerOne,
  },
  {
    title: "Free Eye Surgeries for the Elderly",
    description:
      "120+ elderly citizens received cataract surgeries — bringing their world back into focus.",
    image: bannerTwo,
  },
  {
    title: "Hope and Healing Through Volunteers",
    description:
      "Dedicated medical students made a huge impact by providing care and compassion.",
    image: bannerThree,
  },
  {
    title: "Smiles Returned to Children",
    description:
      "Essential vaccines and nutrition helped over 200 children towards a healthier future.",
    image: bannerFour,
  },
];

const Banner = () => {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className="w-[95%] my-4 rounded-lg mx-auto lg:h-[550px] md:h-[400px] h-[250px]"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="w-full h-full rounded-lg bg-center bg-cover relative"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-0"></div>

            {/* Slide Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className="text-center text-white max-w-2xl">
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
