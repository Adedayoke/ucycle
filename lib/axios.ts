import axios from "axios";

export const BASE_URL = "https://recyclu.pythonanywhere.com";

export const axiosNoToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const axiosToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 📌 Add request/response interceptors for axiosNoToken
// axiosNoToken.interceptors.request.use(request => {
//   console.log("[axiosNoToken] Request:", request);
//   return request;
// });

// axiosNoToken.interceptors.response.use(response => {
//   console.log("[axiosNoToken] Response:", response);
//   return response;
// }, error => {
//   console.log("[axiosNoToken] Error Response:", error.response);
//   return Promise.reject(error);
// });

// 📌 Add request/response interceptors for axiosToken
axiosToken.interceptors.request.use(request => {
  console.log("[axiosToken] Request:", request);
  return request;
});

axiosToken.interceptors.response.use(response => {
  console.log("[axiosToken] Response:", response);
  return response;
}, error => {
  console.log("[axiosToken] Error Response:", error.response);
  return Promise.reject(error);
});
