import { useNavigate } from "react-router";
import { ApiInstance } from "../js/api-instance";
import { toastError } from "../js/utils";
import { logoutUser } from "../js/firebase-operation";
import { useEffect } from "react";

const InterceptorProvider = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = ApiInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resInterceptor = ApiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          await logoutUser().then((res) => {
            navigate("/login");
            toastError("You have been logged out");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      ApiInstance.interceptors.request.eject(reqInterceptor);
      ApiInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);
};

export default InterceptorProvider;
