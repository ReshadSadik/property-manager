import axios from "axios";
import { SERVER_BASE_URL } from "../../utils/constants";
const axiosSecure = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'Authorization': `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`
  },
});

const axiosOpen = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosSecure, axiosOpen };
