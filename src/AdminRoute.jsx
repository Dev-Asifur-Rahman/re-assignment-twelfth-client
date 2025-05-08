import React, { useContext } from "react";
import { Context } from "./js/context";
import LottieSpinner from "./components/LottieSpinner";
import { Navigate } from "react-router";
import { logoutUser } from "./js/firebase-operation";

const AdminRoute = ({children}) => {
  const { loading, user, role } = useContext(Context);
  if (loading) {
    return <LottieSpinner></LottieSpinner>;
  }
  if (user && role) {
    return children;
  } else {
    logoutUser()
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default AdminRoute;
