import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://styledecore.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401) {
          Swal.fire({
            title: "Unauthorized Acces Request?",
            text: "The User Requesting This Information Is Unauthorized?",
            icon: "Warning",
          });
        }
        if (statusCode === 403) {
          Swal.fire({
            title: "Forbidden Access?",
            text: "This Information Is Forbidden For This User?",
            icon: "warning",
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.request.eject(resInterceptor);
    };
  }, [user]);

  return instance;
};
export default useAxiosSecure;
