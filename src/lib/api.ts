import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
