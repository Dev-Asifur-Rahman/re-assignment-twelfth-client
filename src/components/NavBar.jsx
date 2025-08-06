import { useContext, useState } from "react";
import { Context } from "../js/context";
import { logoutUser } from "../js/firebase-operation";
import { toastError, toastSuccess } from "../js/utils";
import { NavLink, useNavigate } from "react-router";
import icon from "../assets/user_icon.svg";
import ToggleMode from "./ToggleMode";
import camplogo from '../assets/images/camp-logo-v-six.png'

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
    <div
      className={`flex justify-between w-full items-center lg:px-6 p-2 min-h-16`}
    >
      <div
        onClick={() => navigateHome("/")}
        className="inline-flex items-center gap-1 w-1/2 md:w-1/2 lg:w-fit hover:cursor-pointer"
      >
        <img
          src={camplogo}
          className={`h-[25px] w-[25px]`}
          alt=""
        />
        <p className="text-xl  md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-bl from-violet-500 to-fuchsia-500  font-extrabold md:inline lg:inline">
          CampAID
        </p>
      </div>
      <div id="nav-text" className="navbar-center hidden lg:flex">
        <div className={`flex items-center gap-x-4 `}>
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
        <section className="flex items-center gap-4">
          <ToggleMode></ToggleMode>
          <div className="flex items-center">
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
                    className=" flex flex-col border bg-white dark:bg-[#21272e] flex-wrap w-fit menu-sm  dropdown-content mt-3 rounded-box z-1 shadow right-0"
                  >
                    <p className="text-center text-nowrap font-bold pt-4 pb-1 mx-7 gradient-text line-clamp-1">
                      {user ? user.displayName : "Unknown"}
                    </p>
                    <li
                      className="border-b border-b-gray-400 pb-1.5 pt-1 pl-5 font-medium"
                      onClick={() => {
                        setDropdown(false);
                        navigate("/available-camps");
                      }}
                    >
                      Available Camps
                    </li>
                    <li
                      className="border-b border-b-gray-400 py-1.5 pl-5 font-medium"
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
                      className="py-1.5 pl-5 font-medium"
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
