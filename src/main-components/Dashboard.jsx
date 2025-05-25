import React, { useContext, useState } from "react";
import InterceptorProvider from "../components/InterceptorProvider";
import { Context } from "../js/context";
import LottieSpinner from "../components/LottieSpinner";
import { NavLink, Outlet, useLocation } from "react-router";
import { CiMenuBurger } from "react-icons/ci";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const { role, loading } = useContext(Context);
  const [open, setOpen] = useState(false);

  const navigation_route_for_admin = [
    {
      href: "/dashboard/manage-camps",
      route: "Manage Camps",
    },
    {
      href: "/dashboard/admin-profile",
      route: "Admin Profile",
    },
    {
      href: "/dashboard/add-camp",
      route: "Add a Camp",
    },
    {
      href: "/dashboard/registered-camps",
      route: "Registered Camps",
    },
  ];

  const navigation_route_for_participants = [
    {
      href: "/dashboard/analytics",
      route: "Analytics",
    },
    {
      href: "/dashboard/participant-profile",
      route: "Profile",
    },
    {
      href: "/dashboard/history",
      route: "Payment History",
    },
    {
      href: "/dashboard/user-registered-camps",
      route: "Registerd Camps",
    },
  ];

  return loading ? (
    <>
      <LottieSpinner></LottieSpinner>
    </>
  ) : (
    <section className="w-full">
      <NavBar></NavBar>
      <div className="w-full">
        {/* for large device  */}
        <section className="w-full lg:flex hidden">
          {role ? (
            <div className="dashboard-navigation  w-1/6 hidden md:hidden lg:block">
              <NavLink to={"/dashboard/manage-camps"}>Manage Camps</NavLink>
              <NavLink to={"/dashboard/admin-profile"}>Admin Profile</NavLink>
              <NavLink to={"/dashboard/add-camp"}>Add A Camp</NavLink>
              <NavLink to={"/dashboard/registered-camps"}>
                Registered Camps
              </NavLink>
            </div>
          ) : (
            <div className="dashboard-navigation hidden md:hidden lg:block  w-1/6 ">
              <NavLink to={"/dashboard/analytics"}>Analytics</NavLink>
              <NavLink to={"/dashboard/participant-profile"}>Profile</NavLink>
              <NavLink to={"/dashboard/history"}>Payment History</NavLink>
              <NavLink to={"/dashboard/user-registered-camps"}>
                Registered Camps
              </NavLink>
            </div>
          )}
          <div className="w-5/6 ">
            <Outlet></Outlet>
          </div>
        </section>
        {/* for medium device  */}
        <section className="w-full lg:hidden md:inline hidden">
          {role ? (
            <div role="tablist" className="tabs tabs-box w-fit mx-auto">
              <NavLink
                to="/dashboard/manage-camps"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Manage Camps
              </NavLink>
              <NavLink
                to="/dashboard/admin-profile"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Admin Profile
              </NavLink>
              <NavLink
                to="/dashboard/add-camp"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Add a Camp
              </NavLink>
              <NavLink
                to="/dashboard/registered-camps"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Registered Camps
              </NavLink>
            </div>
          ) : (
            <div role="tablist" className="tabs tabs-box w-fit mx-auto">
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Analytics
              </NavLink>
              <NavLink
                to="/dashboard/participant-profile"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard/history"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Payment History
              </NavLink>
              <NavLink
                to="/dashboard/user-registered-camps"
                className={({ isActive }) =>
                  `tab ${isActive ? "tab-active" : ""}`
                }
                role="tab"
              >
                Registered Camps
              </NavLink>
            </div>
          )}
          <div className="w-full mt-6">
            <Outlet></Outlet>
          </div>
        </section>
        {/* for small device  */}
        <section className="w-full lg:hidden md:hidden inline">
          <section className="w-full relative flex justify-center my-2">
            <button
              className="btn w-[150px] mx-auto text-white bg-linear-to-bl from-violet-500 to-fuchsia-500"
              onClick={() => setOpen(!open)}
            >
              Menu
            </button>
            {open && (
              <ul
                id="dashboard-menu"
                className="absolute top-[110%] border w-[200px]"
              >
                {role
                  ? navigation_route_for_admin.map((item, index) => (
                      <li onClick={() => setOpen(!open)} key={index}>
                        <NavLink to={item.href}>{item.route}</NavLink>
                      </li>
                    ))
                  : navigation_route_for_participants.map((item, index) => (
                      <li onClick={() => setOpen(!open)} key={index}>
                        <NavLink to={item.href}>{item.route}</NavLink>
                      </li>
                    ))}
              </ul>
            )}
          </section>
          <div>
            <Outlet></Outlet>
          </div>
        </section>

        {/* you have to use interceptors in every parent route  */}
        <InterceptorProvider></InterceptorProvider>
      </div>
    </section>
  );
};

export default Dashboard;
