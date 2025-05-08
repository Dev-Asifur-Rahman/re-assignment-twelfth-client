import React from "react";
import HomeSwiper from "../../components/HomeSwiper";
import Banner from "../../components/Banner";
import CommonHeading from "../../components/CommonHeading";

function Home() {

  return (
    <div>
      <p className="">Home</p>
      <CommonHeading></CommonHeading>
      <Banner></Banner>
      <HomeSwiper></HomeSwiper>
    </div>
  );
}

export default Home;
