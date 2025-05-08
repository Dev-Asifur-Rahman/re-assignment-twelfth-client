import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import { Context } from "../js/context";
import LottieSpinner from "../components/LottieSpinner";
import InterceptorProvider from "../components/InterceptorProvider";

const MainHome = () => {
  const { loading } = useContext(Context);
  return (
    <>
      {loading ? (
        <LottieSpinner></LottieSpinner>
      ) : (
        <>
          <NavBar></NavBar>
          <Outlet></Outlet>
          <InterceptorProvider></InterceptorProvider>
        </>
      )}
    </>
  );
};

export default MainHome;
