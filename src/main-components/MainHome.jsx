import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import { Context } from "../js/context";
import LottieSpinner from "../components/LottieSpinner";
import InterceptorProvider from "../components/InterceptorProvider";
import Footer from "../components/Footer";
import ScrollToTop from "../ScrollToTop";

const MainHome = () => {
  const { loading } = useContext(Context);
  return (
    <>
      {loading ? (
        <LottieSpinner></LottieSpinner>
      ) : (
        <>
          <NavBar></NavBar>
          <ScrollToTop></ScrollToTop>
          <Outlet></Outlet>
          <Footer></Footer>
          <InterceptorProvider></InterceptorProvider>
        </>
      )}
    </>
  );
};

export default MainHome;
