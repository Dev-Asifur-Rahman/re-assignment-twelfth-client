import React from "react";
import "./css/error.css"
import { useNavigate } from "react-router";

const Error = () => {
    const navigate = useNavigate()
    const back = () =>{
        navigate(-1)
    }
  return (
    <div>
      <div className="bg-purple">
        <div className="stars">
          <div className="flex flex-col justify-center items-center h-screen gap-3">
            <img
              className="image-404"
              src="http://salehriaz.com/404Page/img/404.svg"
              width="300px"
              alt="404 Not Found"
            />
            <div onClick={back} className="btn-go-home">GO BACK</div>
          </div>

          <div className="objects">
            <img
              className="object_rocket"
              src="http://salehriaz.com/404Page/img/rocket.svg"
              width="40px"
              alt="Rocket"
            />
            <div className="earth-moon">
              <img
                className="object_earth"
                src="http://salehriaz.com/404Page/img/earth.svg"
                width="100px"
                alt="Earth"
              />
              <img
                className="object_moon"
                src="http://salehriaz.com/404Page/img/moon.svg"
                width="80px"
                alt="Moon"
              />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src="http://salehriaz.com/404Page/img/astronaut.svg"
                width="140px"
                alt="Astronaut"
              />
            </div>
          </div>

          <div className="glowing_stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;