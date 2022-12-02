import axios from "axios";

const config = {
  baseURL: "https://habit-it.onrender.com/api",
  // baseURL: "http://localhost:4000/api",
  timeout: 2000,
  withCredentials: true,
};
const axiosClient = axios.create(config);

export default axiosClient;
