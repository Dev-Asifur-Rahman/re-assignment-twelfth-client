
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const slides = [
  {
    title: "500+ Patients Treated in One Day",
    description:
      "A landmark medical camp in Bogura provided care to over 500 people in 8 hours.",
    image: "/public/banner-images/bannerimageone.webp",
  },
  {
    title: "Free Eye Surgeries for the Elderly",
    description:
      "120+ elderly citizens received cataract surgeries — bringing their world back into focus.",
    image:"/public/banner-images/bannerimagetwo.jpg",
  },
  {
    title: "Hope and Healing Through Volunteers",
    description:
      "Dedicated medical students made a huge impact by providing care and compassion.",
    image: "/public/banner-images/bannerimagethree.jpg",
  },
  {
    title: "Smiles Returned to Children",
    description:
      "Essential vaccines and nutrition helped over 200 children towards a healthier future.",
    image:"/public/banner-images/bannerimagefour.png",
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
            <div className="hero-overlay absolute z-[2]"></div>
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-0"></div> */}

            {/* Slide Content */}
            <div className="relative z-[3] flex items-center justify-center h-full md:w-3/5 lg:w-2/4 px-4 md:px-8 lg:px-14">
              <div className="text-center md:text-start lg:text-start  text-white ">
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg mb-4">{slide.description}</p>
                <button className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 outline-none border-none">Get Started</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
