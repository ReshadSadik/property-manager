import axios from "axios";
import { SERVER_BASE_URL } from "../../utils/constants";
const axiosSecure = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${
      localStorage.authToken && JSON.parse(localStorage.authToken)
    }`,
  },
});

axiosSecure.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.userDetails);
  // Add your custom parameter to the request
  config.params = {
    ...config.params,
    userEmail: user.email,
  };

  return config;
});

const axiosOpen = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosSecure, axiosOpen };
