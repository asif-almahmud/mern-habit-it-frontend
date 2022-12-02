import axios from "axios";

const config = {
  baseURL: "http://localhost:4000/api",
  timeout: 2000,
  withCredentials: true,
};
const axiosClient = axios.create(config);

export default axiosClient;

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL, payload) {
  return axiosClient.delete(`${URL}`, payload).then((response) => response);
}
