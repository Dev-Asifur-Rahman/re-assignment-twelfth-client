import React, { useContext } from "react";
import InterceptorProvider from "../components/InterceptorProvider";
import { Context } from "../js/context";
import LottieSpinner from "../components/LottieSpinner";
import { NavLink, Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const { role, loading } = useContext(Context);
  return loading ? (
    <>
      <LottieSpinner></LottieSpinner>
    </>
  ) : (
    <div className="w-full">
      {/* for large device  */}
      <section className="w-full lg:flex hidden">
        {role ? (
          <div className="dashboard-navigation  w-1/6 hidden md:hidden lg:block border">
            <NavLink to={"/dashboard/manage-camps"}>Manage Camps</NavLink>
            <NavLink to={"/dashboard/admin-profile"}>Admin Profile</NavLink>
            <NavLink to={"/dashboard/add-camp"}>Add A Camp</NavLink>
            <NavLink to={"/dashboard/registered-camps"}>
              Registered Camps
            </NavLink>
          </div>
        ) : (
          <div className="dashboard-navigation hidden md:hidden lg:block  w-1/6 border">
            <NavLink to={"/dashboard/analytics"}>Analytics</NavLink>
            <NavLink to={"/dashboard/participant-profile"}>Profile</NavLink>
            <NavLink to={"/dashboard/history"}>Payment History</NavLink>
            <NavLink to={"/dashboard/user-registered-camps"}>
              Registered Camps
            </NavLink>
          </div>
        )}
        <div className="w-5/6 border">
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
        <div>
          {role ? (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Click
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to={"/dashboard/manage-camps"}>Manage Camps</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/admin-profile"}>
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/add-camp"}>Add a Camp</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/registered-camps"}>
                    Registered Camps
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Click
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to={"/dashboard/analytics"}>Analytics</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/participant-profile"}>Profile</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/history"}>Payment History</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/user-registered-camps"}>Registerd Camps</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </section>
      {/* you have to use interceptors in every parent route  */}
      <InterceptorProvider></InterceptorProvider>
    </div>
  );
};

export default Dashboard;
