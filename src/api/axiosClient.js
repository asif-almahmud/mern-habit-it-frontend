import axios from "axios";

const config = {
  baseURL: "https://habitit.onrender.com/api",
  // baseURL: "http://localhost:4000/api",
  timeout: 2000,
  withCredentials: true,
};
const axiosClient = axios.create(config);

export default axiosClient;
