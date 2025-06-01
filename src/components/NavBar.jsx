import { useContext, useState } from "react";
import { Context } from "../js/context";
import { logoutUser } from "../js/firebase-operation";
import { toastError, toastSuccess } from "../js/utils";
import { NavLink, useNavigate } from "react-router";
import icon from "../assets/user_icon.svg";
import logo from "../assets/images/site_logo_two.svg";
import ToggleMode from "./ToggleMode";

const NavBar = () => {
  const { user, role, mode } = useContext(Context);
  const navigate = useNavigate();
  const navigateHome = useNavigate();
  const dashboard = useNavigate();
  const [Dropdown, setDropdown] = useState(false);

  const signOut = () => {
    logoutUser()
      .then((res) => toastSuccess("Signed Out Successfully"))
      .catch((error) => toastError("Something went wrong try again"));
  };


  const sendLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-between w-full items-center p-2 min-h-16 bg-base-100 shadow-sm">
      <div
        onClick={() => navigateHome("/")}
        className="inline-flex items-center w-1/2 md:w-1/2 lg:w-fit hover:cursor-pointer"
      >
        <img src={logo} className="h-[40px]" alt="" />
        <p className="text-xl  md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-bl from-violet-500 to-fuchsia-500  font-extrabold md:inline lg:inline">
          CampAID
        </p>
      </div>
      <div id="nav-text" className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-x-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/available-camps"}>Available Camps</NavLink>
          {user && !role && (
            <NavLink to={"/dashboard/analytics"}>Dashboard</NavLink>
          )}
          {user && role && (
            <NavLink to={"/dashboard/manage-camps"}>Dashboard</NavLink>
          )}
        </div>
      </div>
      <div className="inline-flex justify-end  items-center w-1/2 md:w-1/2 lg:w-fit">
        <section className="flex items-center gap-2">
          <ToggleMode></ToggleMode>
          <div className="flex items-center border">
            {user ? (
              <div
                className="dropdown"
                tabIndex={0}
                onClick={() => setDropdown(!Dropdown)}
              >
                <div className="rounded-full h-[40px] w-[40px]">
                  <img
                    src={user ? user.photoURL : icon}
                    className="h-full w-full hover:cursor-pointer rounded-full"
                    alt=""
                  />
                </div>
                {Dropdown && (
                  <ul
                    id="dropdown-navbar"
                    tabIndex={0}
                    className=" flex flex-col flex-wrap w-fit menu-sm bg-base-100 dropdown-content mt-3 rounded-box z-1 shadow right-0"
                  >
                    <p className="text-center text-nowrap font-bold pt-6 pb-1 mx-7">
                      {user ? user.displayName : "Unknown"}
                    </p>
                    <li
                      className="border-b-2 border-b-gray-400 pb-1 pt-3 pl-3 font-medium"
                      onClick={() => {
                        setDropdown(false);
                        navigate("/available-camps");
                      }}
                    >
                      Available Camps
                    </li>
                    <li
                      className="border-b-2 border-b-gray-400 py-1 pl-3 font-medium"
                      onClick={() => {
                        setDropdown(false);
                        if (user && role) {
                          dashboard("/dashboard/manage-camps");
                        } else {
                          dashboard("/dashboard/analytics");
                        }
                      }}
                    >
                      Dashboard
                    </li>
                    <li
                      className="py-1 pl-3 font-medium"
                      onClick={() => {
                        signOut();
                        return setDropdown(false);
                      }}
                    >
                      SignOut
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                onClick={sendLogin}
                className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500"
              >
                Join Us
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NavBar;
