// utils/http.ts
import axios from "axios";
import Cookies from "js-cookie";

export const prefix = "/api/v1";
export const baseurl = "http://localhost:9005";
// export const baseurl = "https://food-recipe-sage-one.vercel.app/";
export const url = baseurl + prefix;

const http = axios.create({
  baseURL: url,
});
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("foodToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove("foodToken");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default http;
