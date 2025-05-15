import { createBrowserRouter } from "react-router";
import MainHome from "./main-components/MainHome";
import Home from "./children-components/main-home/Home";
import Error from "./Error";
import Register from "./children-components/main-home/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "./children-components/main-home/Details";
import Login from "./children-components/main-home/Login";
import Dashboard from "./main-components/Dashboard";
import AvailableCamps from "./children-components/main-home/AvailableCamps";
import AdminRoute from "./AdminRoute";
import ManageCamps from "./children-components/Dashboard/admin-components/ManageCamps";
import OrganizerProfile from "./children-components/Dashboard/admin-components/OrganizerProfile";
import AddCamp from "./children-components/Dashboard/admin-components/AddCamp";
import RegisteredCamps from "./children-components/Dashboard/participants-components/RegisteredCamps";
import Analytics from "./children-components/Dashboard/participants-components/Analytics";
import ParticipantProfile from "./children-components/Dashboard/participants-components/ParticipantProfile";
import PaymentHistory from "./children-components/Dashboard/participants-components/PaymentHistory";
import ManageRegisteredCamps from "./children-components/Dashboard/admin-components/ManageRegisteredCamps";
import UpdateCamp from "./children-components/Dashboard/admin-components/UpdateCamp";
import PaymentRoute from "./children-components/Dashboard/participants-components/PaymentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHome></MainHome>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "available-camps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "camp-details/:campId",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "manage-camps",
        element: (
          <AdminRoute>
            <ManageCamps></ManageCamps>
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <OrganizerProfile></OrganizerProfile>
          </AdminRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute>
            <Analytics></Analytics>
          </PrivateRoute>
        ),
      },
      {
        path: "participant-profile",
        element: (
          <PrivateRoute>
            <ParticipantProfile></ParticipantProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "user-registered-camps",
        element: (
          <PrivateRoute>
            <RegisteredCamps></RegisteredCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "update-camp",
        element: (
          <PrivateRoute>
            <UpdateCamp></UpdateCamp>
          </PrivateRoute>
        ),
      },
      {
        path: "registration-payment",
        element: (
          <PrivateRoute>
            <PaymentRoute></PaymentRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);
