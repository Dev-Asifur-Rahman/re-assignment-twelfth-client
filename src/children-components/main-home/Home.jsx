import HomeSwiper from "../../components/HomeSwiper";
import Banner from "../../components/Banner";
import CommonHeading from "../../components/CommonHeading";
import { NavLink } from "react-router";

import TopFavouriteCamp from "../../components/TopFavouriteCamp";
import ReviewSection from "../../components/ReviewSection";
import CallToAction from "../../components/CallToAction";
import CampHighlights from "../../components/CampHighlights";
import Achievements from "../../components/Achievements";
import HowItWorks from "../../components/HowItWorks";
import OurGallery from "../../components/OurGallery";

function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <CommonHeading heading={'Why Choose CampAID?'} description={'Discover what makes our camps an unforgettable experience for every child.'}></CommonHeading>
      <CampHighlights></CampHighlights>
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
      <CommonHeading heading={'Our Achievements'} description={'Over the years, CampAID has welcomed hundreds of campers, provided top-quality programs, and created unforgettable memories. Here’s what we’re proud of.'}></CommonHeading>
      <Achievements></Achievements>
      <CommonHeading heading={'How It Works'} description={'We make joining CampAID simple and stress-free. Follow these easy steps to start your adventure.'}></CommonHeading>
      <HowItWorks></HowItWorks>
      <CommonHeading heading={'Our Shining Moments'} description={'Take a glimpse into the unforgettable experiences our campers enjoy at CampAID.'}></CommonHeading>
      <OurGallery></OurGallery>
      <CallToAction></CallToAction>
    </div>
  );
}

export default Home;
